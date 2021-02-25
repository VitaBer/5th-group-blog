document.querySelector('#login-page').addEventListener('click', () => {
  document.querySelector('.register__container').style.display = 'none'
  document.querySelector('.login__container').style.display = 'block'
})

document.querySelector('#register-page').addEventListener('click', () => {
  document.querySelector('.login__container').style.display = 'none'
  document.querySelector('.register__container').style.display = 'block'
})

document.querySelector('#login-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  document.querySelector('#wrong').style.display = 'none'
  const email = document.querySelector('#login-email').value
  const password = document.querySelector('#login-password').value
  const info = {email: email, password: password}
  try {
    const response = await fetch('https://tvart.lt/blog/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    if (response.status !== 200) throw await response.json()
    const data = await response.json()
    localStorage.setItem('fullName', data.fullName)
    localStorage.setItem('email', data.email)
    localStorage.setItem('token', data.tokens[0].token)
    if (data.profileImgURL) localStorage.setItem('profileImgURL', `https://tvart.lt:3000/${data.profileImgURL}`)
    window.location.href = '../index.html'
  } catch (e) {
    document.querySelector('#wrong').style.display = 'block'
  }
})

document.querySelector("#file").addEventListener('change', (e) => {
  const fileName = document.querySelector("#file").files[0].name
  const nextSibling = e.target.nextElementSibling
  nextSibling.innerText = fileName
})

document.querySelector('#register-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.querySelector('#register-email').value
  const password = document.querySelector('#register-password').value
  const fullName= document.querySelector('#fullName').value
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)
  formData.append('fullName', fullName)
  if (document.querySelector('#file').files[0]) formData.append('profileImg', document.querySelector('#file').files[0])
  try {
    const response = await fetch('https://tvart.lt/blog/user/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    if (response.status !== 200) throw await response.json()
    const data = await response.json()
    document.querySelector('.login__container').style.display = 'block'
    document.querySelector('.register__container').style.display = 'none'
  } catch (e) {
      console.log(e)
  }
})