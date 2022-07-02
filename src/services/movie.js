import axios from "axios";

export async function movieList(limit, offset){
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pelicula/?limit=${limit}&offset=${offset}`)
    return res.data
}
export async function movieDetail(id){
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pelicula/${id}/`)
    return res.data
}
export async function getReviews(id){
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pelicula/${id}/criticas/`)
    return res.data
}
export async function getComments(id){
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/pelicula/${id}/comentarios/`)
    return res.data
}
export const createComment = async (text, peliculaId) => {

    let auth
    auth = localStorage?.getItem('auth')
    if(!auth) {
        return false 
    }
    auth = JSON.parse(auth);
    let username = auth.username

    return {
        id: Math.random().toString(36).substring(2, 9),
        usuario: {
            first_name: auth.username.substring(0,9),
            last_name: auth.username.substring(9)
        },
        creado: new Date().toISOString(),
        modificado: new Date().toISOString(),
        calificacion: null,
        mensaje: text,
        pelicula: peliculaId
    }

}
export const deleteComment = async () => {
    return {}
}
  