import React from 'react'

const PasswordUpdateForm = ({
    loading,
    setLoading,
    handleSubmit,
    password,
    setPassword
}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Your Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        placeholder="Enter new password"
        disabled={loading}
        value={password}
      />
      <br />
      <button
        className="btn btn-primary"
        disabled={!password || password.length < 6 || loading}
      >
        Submit
      </button>
    </div>
  </form>
  )
}

export default PasswordUpdateForm
