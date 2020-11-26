import React from 'react';
import PropTypes from 'prop-types';
import { withStore } from '../../store';
import API from '../../api/api';

class SignIn extends React.Component {
  constructor(props) {
    const defaults = { email: '', password: '' };

    super(props);
    this.state = { user: defaults, formErrors: { } };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user, formErrors } = this.state;
    const { history, store } = this.props;

    Object.keys(user).forEach((field) => this.validateField(field));
    const hasErrors = Object.values(formErrors).filter((e) => e).length;

    if (!user || hasErrors) return;
    API.post('auth/login', user)
      .then(({ data }) => {
        this.setState({ error: null });
        store.set('user', data.user);
        localStorage.setItem('token', data.token);
        history.push('/');
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  handleChange(event) {
    const { user } = this.state;
    const name = event.target.id;
    const { value } = event.target;
    user[name] = value;
    this.setState({ user }, () => { this.validateField(name, value); });
  }

  validateField(fieldName) {
    const { formErrors, user } = this.state;
    const value = user[fieldName];
    let valid;

    switch (fieldName) {
      case 'email':
        valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = valid ? '' : 'Email is invalid';
        break;
      case 'password':
        valid = value.length >= 6;
        formErrors.password = valid ? '' : 'Password is too short';
        break;
      default:
        break;
    }
    this.setState({ formErrors });
  }

  // eslint-disable-next-line class-methods-use-this
  errorClass(error) {
    return (error ? 'is-invalid' : '');
  }

  render() {
    const { user, formErrors, error } = this.state;
    return (
      <div className="card text-left mb-3">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            { error && (
              <div className="alert alert-danger">
                Invalid credentials
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${this.errorClass(formErrors.email)}`}
                id="email"
                aria-describedby="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                value={user.email}
              />
              {formErrors.email && (
                <div className="invalid-feedback">
                  {formErrors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${this.errorClass(formErrors.password)}`}
                id="password"
                placeholder="Enter password"
                onChange={this.handleChange}
                value={user.password}
              />
              {formErrors.password && (
                <div className="invalid-feedback">
                  {formErrors.password}
                </div>
              )}
            </div>
            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};
export default withStore(SignIn);
