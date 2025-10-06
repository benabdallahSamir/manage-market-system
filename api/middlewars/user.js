function handleUser(user) {
  const handleUser = {
    id: user._id,
    username: user.username,
    role: user.role,
  };
  return handleUser;
}

export default handleUser;
