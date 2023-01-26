const validUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const wrongPasswordUser = {
  email: 'admin@admin.com',
  password: 'public_user',
}

const invalidUser = {
  email: 'mac@miller.com',
  password: 'iS2somethundercat',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc0Njc2MzQxLCJleHAiOjE2NzQ2NzkwNDF9.sAjwIlc3otV_8EJQAWNgL6rzfN_7IXlminbaenBpBJA'

const userInfo = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  iat: 1674688228,
  exp: 1674690928
  }

export {
  validUser,
  wrongPasswordUser,
  invalidUser,
  token,
  userInfo,
}