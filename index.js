const http = require('http')
const fs = require('fs')

const PORT = process.env.PORT | 8080

const getPage = (url, res) => {
    fs.readFile(url, (err, data) => {
        if (err) {
            console.error('Error : ', err)
        }
        res.write(data)
        res.end()
    })
}

const requestHandler = (req, res ) => {
    res.writeHead(200, {'Content-Type':'text/html'})
    switch (req.url) {
        case '/':
        getPage('index.html', res)
        break    
        case '/about':
        getPage('about.html', res)
        break 
        case '/contact-me':
        getPage('contact-me.html', res)
        break 
        default:
        res.writeHead(404, {'Content-Type':'text/html'})
        getPage('404.html', res)
        break 
    }
}

const app = http.createServer(requestHandler)

app.listen(PORT, (err) => {
    if(err) {return console.log(`This error: ${err}`)}
    console.log(`Server is runing on PORT ${PORT}`)
})