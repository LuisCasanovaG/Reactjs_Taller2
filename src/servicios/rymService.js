export async function getAllCharacters(url) {
    //Promise es un objeto siempre empieza con mayuscula
    return new Promise((resolve,reject)=>{
        fetch(url).then(res=>res.json() ).then(data=>{resolve(data)})
    })
}