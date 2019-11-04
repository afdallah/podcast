import React from 'react'
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import { FaSpinner } from "react-icons/fa";
import { server } from '../config'

import Layout from "../components/Layout";
import Flex from "../components/Flex";

import css from "../styles.scss";
import { classNames } from '../helpers'

const clsHeading = classNames({
  [css.heading]: true,
  [css['heading--xl']]: true
})

class profile extends React.Component {
  state = {
    isFetching: false,
    isDisabled: this,
    imagePreview: null,
    form: {
      firstName: "",
      lastName: "",
      email: "",
    }
  };

  componentDidMount () {
    const { user } = this.props
    const { form } = this.state

    this.setState({
      form: {
        ...form,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    })
  }

  handleChange = event => {
    let { name, value } = event.target;
    if (name === "photo") {
      value = event.target.files[0];
    }

    if (process.browser && name === "photo") {
      const reader = new FileReader();

      reader.onloadend = function(event) {
        this.setState({
          imagePreview: reader.result,
          isDisabled: false
        });
      }.bind(this);

      reader.readAsDataURL(value);
    }

    this.setState({
      form: Object.assign({}, this.state.form, { [name]: value }),
      isDisabled: false
    });
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { form } = this.state
    const { user } = this.props
    const formData = new FormData()

    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        const element = form[key];
        formData.append(key, element);
      }
    }

    this.setState({
      isFetching: true
    });

    try {
      const res = await fetch(`${server}/api/user/${user._id}`, {
        method: "PUT",
        body: formData
      });

      await res.json();

      setTimeout(() => {
        this.setState({ isFetching: false });
      }, 300)

      window.location = '/profile'
      // Router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  render () {
    const { user } = this.props

    return (
      <>
        <h1
          className={clsHeading}
        >
          Hi {this.state.form.firstName || user.firstName} {user.level > 1 ? '(listener)' : '(Host)'}
        </h1>
        <form
          className="form"
          method="post"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
          <Flex>
            <Flex.Item span="4">
              <div className={css.form__item}>
                <label
                  className={[css.label, css["label--file"]].join(" ")}
                  htmlFor="profile-photo"
                >
                  Profile photo
                  <img
                    style={{
                      marginTop: "7px"
                    }}
                    className={css.image}
                    src={
                      this.state.imagePreview
                        ? this.state.imagePreview
                        : user.photo.url
                    }
                  />
                  <input
                    onChange={this.handleChange}
                    type="file"
                    name="photo"
                    className="input-file"
                    id="profile-photo"
                    accept="image/*"
                  />
                </label>
              </div>
            </Flex.Item>
            <Flex.Item>
              <Flex gap="narrow">
                <Flex.Item>
                  <div className={css.form__item}>
                    <label className={css.label} htmlFor="first-name">

                      First Name
                    </label>
                    <input
                      onChange={this.handleChange}
                      type="text"
                      name="firstName"
                      className={css.input}
                      id="firstName"
                      defaultValue={user.firstName}
                      required
                      placeholder="Enter your short name"
                    />
                  </div>

                </Flex.Item>
                <Flex.Item>
                  <div className={css.form__item}>
                    <label className={css.label} htmlFor="last-name">

                      Last Name
                    </label>
                    <input
                      onChange={this.handleChange}
                      type="text"
                      name="lastName"
                      className={css.input}
                      id="lastName"
                      defaultValue={user.lastName}
                      required
                      placeholder="Enter your family name"
                    />
                  </div>

                </Flex.Item>
              </Flex>
              <div className={css.form__item}>
                <label className={css.label} htmlFor="email-address">

                  Email Address
                </label>
                <input
                  onChange={this.handleChange}
                  name="email"
                  type="email"
                  className={css.input}
                  id="email"
                  placeholder="Enter your email address"
                  required
                  defaultValue={user.email}
                />
              </div>
              <button
                type="submit"
                className={[css.button, css["button--submit"]].join(" ")}
                disabled={this.state.isDisabled && !this.state.isFetching}
              >
                {this.state.isFetching ?
                  <FaSpinner
                    className={css.spinning}
                  /> :
                  ''
                }
                Update profile
              </button>
            </Flex.Item>
          </Flex>
          {user.level > 1 ? (
            <>
              <hr/>
              <Flex>
                <Flex.Item>
                  <span style={{opacity: .8, marginRight: '10px'}}>I want to be a host! </span>
                  <a onClick={() => alert('coming soon')} className={[css.button, css['button--xs']].join(' ')}>Send request</a>
                </Flex.Item>
              </Flex>
            </>
          ) : ''}
        </form>
      </>
    )
  }
}

export default profile