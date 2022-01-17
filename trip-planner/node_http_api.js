// NODE JS HTTPS API
const http = require("https")

// GET
// GET
const optionsGet = {
    method: "GET",
    hostname: "dog.ceo",
    path: "/api/breeds/list/all",
}

const req = http.request(optionsGet, (res) => {
    const chunks = []

    res.on("data", (chunk) => {
        chunks.push(chunk)
    })

    res.on("end", () => {
        const body = Buffer.concat(chunks)
        const data = JSON.parse(body.toString())
        for (const breed in data.message) {
            console.log(breed)
        }
    })
})

req.end()

//POST

const data = JSON.stringify({ name: "Roger", age: 8 })

const optionsPost = {
    method: "POST",
    hostname: "api.randomservice.com",
    port: null,
    path: "/dog",
    headers: {
        "content-type": "application/json",
        authorization: "Bearer 123abc456def",
        "content-length": data.length,
    },
}

const reqPost = http.request(optionsPost, (res) => {
    const chunks = []

    res.on("data", (chunk) => {
        chunks.push(chunk)
    })

    res.on("end", () => {
        const body = Buffer.concat(chunks)
        console.log(body.toString())
    })
})

reqPost.write(data)
reqPost.end()