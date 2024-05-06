import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";

const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_REGEX = /^[0-9]{10,10}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'auth/register';

const Register = () => {
  const nameRef = useRef()
  const errRef = useRef();

  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  useEffect(() => {
    setIsValidName(NAME_REGEX.test(name));
  }, [name])

  useEffect(() => {
    setIsValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setIsValidPhone(PHONE_REGEX.test(phone));
  }, [phone])

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword])

  useEffect(() => {
    setErrMsg('');
  }, [email, password, matchPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, { name, email, phone, password });
      console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setMatchPassword('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('email Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ?
        (<section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>)
        :
        (<section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>

            <label htmlFor="name">
              Name:
              <FontAwesomeIcon icon={faCheck} className={isValidName ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={isValidName || !name ? "hide" : "invalid"} />
            </label>
            <input
              type='text'
              id="name"
              ref={nameRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              aria-invalid={!isValidName}
              aria-describedby="uid-note"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            <p id="uid-note" className={nameFocus && name && !isValidName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="email">
              Email:
              <FontAwesomeIcon icon={faCheck} className={isValidEmail ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={isValidEmail || !email ? "hide" : "invalid"} />
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={isValidEmail ? "false" : "true"}
              aria-describedby="uid-note"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id="uid-note" className={emailFocus && email && !isValidEmail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              min 1 characters.<br />
              Must begin with a letter.
            </p>

            <label htmlFor="phone">
              Phone:
              <FontAwesomeIcon icon={faCheck} className={isValidPhone ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={isValidPhone || !phone ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="phone"
              autoComplete="off"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              aria-invalid={isValidPhone ? "false" : "true"}
              aria-describedby="uid-note"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            <p id="uid-note" className={phoneFocus && phone && !isValidPhone ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              min 1 characters.<br />
              Must begin with a letter.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="password-note"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p id="password-note" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>


            <label htmlFor="confirm_password">
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirm-note"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirm-note" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button disabled={!isValidEmail || !isValidEmail || !validPassword || !validMatch ? true : false}>Sign Up</button>
          </form>
          <p>
            Already registered?<br />
            <span className="line">
              <Link to="/login">Sign Up</Link>
            </span>
          </p>
        </section>)
      }
    </>
  )
}

export default Register