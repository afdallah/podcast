import React from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import slug from "slug";
import { FaSpinner } from "react-icons/fa";
import { server } from '../config'
import Container from '../components/Container'

// Dynamically/lazyload plugin and prevent this component
// To be rendered on the server
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("rich-markdown-editor"), {
  ssr: false
});

import Flex from "../components/Flex";
import Editable from "../components/Editable";
import Select, { Option } from "../components/Select";

import css from "../styles.scss";
import { dark } from "../helpers";

const defaultOptions = [{
  _id: null,
  firstName: 'Nothing to select',
  lastName: ''
}]

class Publish extends React.Component {
  state = {
    isFetching: false,
    imagePreview: null,
    guests: [],
    form: {
      title: "",
      published: true,
      audio: "",
      host: "",
      guest: "",
      content: "",
      tags: [],
      image: {},
      slug: ""
    }
  };

  static async getInitialProps({ req }) {
    const res = await fetch(`${server}/api/publish`);
    const guests = await res.json();

    return {
      guests
    };
  }

  componentDidMount () {
    this.setState({
      form: Object.assign({}, this.state.form, {
        host: this.props.user._id
      })
    })
  }

  handleChange = event => {
    let { name, value } = event.target;
    if (name === "image") {
      value = event.target.files[0];
    }

    if (process.browser && name === "image") {
      const reader = new FileReader();

      reader.onloadend = function(event) {
        this.setState({
          imagePreview: reader.result
        });
      }.bind(this);

      reader.readAsDataURL(value);
    }

    this.setState({
      form: Object.assign({}, this.state.form, {
        [name]: value,
        slug:
          name === "title"
            ? slug(value.slice(0, 90).toLowerCase())
            : slug(this.state.form.slug.slice(0, 90).toLowerCase())
      })
    });
  };

  handleEditable = event => {
    this.setState({
      form: Object.assign(
        {},
        {
          slug: event.target.value
        }
      )
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { form } = this.state;;
    const formData = new FormData();

    for (const key in Object.assign({}, form, {
      published: true,
    })) {
      if (form.hasOwnProperty(key)) {
        const element = form[key];
        formData.append(key, element);
      }
    }

    this.setState({
      isFetching: true
    });

    try {
      const res = await fetch(`${server}/api/episode`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      this.setState({
        isFetching: false
      });

      Router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  handleSelect = (value, name) => {
    this.setState({
      form: Object.assign({}, this.state.form, {
        [name]: value
      })
    });
  };

  handleEditor = value => {
    this.setState({
      form: Object.assign({}, this.state.form, {
        content: value()
      })
    });
  };

  render() {
    const { user } = this.props
    if (user.level > 1) {
      return (
        <Container>
          <h2>401 | You are not authorized</h2>
        </Container>
      )
    }

    return (
      <>
        <h1 className={`${css.heading} ${css.headingXl}`}> Tell a story... </h1>
        <form
          className="form"
          action="/api/episode"
          method="post"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
          <Flex>
            <Flex.Item span="3">
              <div className={css.form__item}>
                <label
                  className={[css.label, css["label--file"]].join(" ")}
                  htmlFor="podcast-image"
                >
                  Artwork
                  <img
                    style={{
                      marginTop: "7px"
                    }}
                    className={css.image}
                    src={
                      this.state.imagePreview
                        ? this.state.imagePreview
                        : "./static/images/upload.svg"
                    }
                  />
                  <input
                    onChange={this.handleChange}
                    type="file"
                    name="image"
                    className="input-file"
                    id="podcast-image"
                    accept="image/*"
                    required
                  />
                </label>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={css.form__item}>
                <label className={css.label} htmlFor="podcast-title">

                  Title
                </label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="title"
                  className={css.input}
                  id="podcast-title"
                  placeholder="Enter podcast title"
                  required
                />
              </div>
              <div
                className={css.form__item}
                style={{
                  marginTop: "-25px"
                }}
              >

                {/* <label htmlFor="podcast-slug">Slug</label> */}
                <Editable
                  name="slug"
                  passive="http://ngobrol.im/episode/"
                  id="slug"
                  html={this.state.form.slug}
                  onChange={this.handleEditable}
                  required
                />
              </div>
              <div className={css.form__item}>
                <label className={css.label} htmlFor="podcast-url">

                  Audio url
                </label>
                <input
                  onChange={this.handleChange}
                  name="audio"
                  type="text"
                  className={css.input}
                  id="podcast-url"
                  placeholder="http://host.com/filename.mp3"
                  required
                />
              </div>
              <div className={css.form__item}>
                <label className={css.label} htmlFor="podcast-content">

                  Content
                </label>
                <div className={css["content-editor"]}>
                  <Editor
                    dark={true}
                    id="podcast-content"
                    theme={dark}
                    onChange={this.handleEditor}
                    required
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* <div className={css.form__item}>
                <label className={css.label} htmlFor="podcast-guest">
                  Guest
                </label>
                <Select name="guest" onChange={this.handleSelect} required>
                  {this.props.guests.map((guest, i) => (
                    <Option key={guest._id + +new Date()} value={guest._id}>
                      {guest.firstName + ' ' + guest.lastName}
                    </Option>
                  ))}
                </Select>
              </div> */}

              <button
                type="submit"
                className={[css.button, css["button--submit"]].join(" ")}
                disabled={this.state.isFetching}
              >
                {this.state.isFetching ?
                  <FaSpinner
                    className={css.spinning}
                  /> :
                  ''
                }
                Broadcast Now!
              </button>
            </Flex.Item>
          </Flex>
        </form>
      </>
    );
  }
}

export default Publish;
