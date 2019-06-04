self.addEventListener("push", e => {
    const data = e.data.json()
    self.registration.showNotification(data.title, {
        body: 'Notified',
        icon: 'https://cdn-images-1.medium.com/letterbox/36/36/50/50/1*ku2nzxhx71D5ge9A7wRd2Q.png?source=logoAvatar-9a17506ad86d---42759d5da545', 
    })
})