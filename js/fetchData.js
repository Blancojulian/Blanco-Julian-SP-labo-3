
const urlBasePersona = 'http://localhost/sp-labo-3/personasFutbolitasProfesionales.php';

const esJsonResponse = res => res.headers.get("content-type").includes('json');

export const getPersonas = (callback, onError) => {

    try {
        
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('GET', urlBasePersona);
        xhr.send();
        xhr.onload = function() {
            
            try {
                if (xhr.status === 200) {
                    callback(xhr.response);
                } else {
                    throw new Error('Fallo la solicitud');
                }
            } catch (error) {
                onError();
            }
            
        };
    
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // solicitud finalizada
            }
        };
    
        xhr.onerror = function(e) {
            console.log(e);
            console.log(e.target.status);
            onError();
        };
        
    } catch (err) {
        throw err;
    }
}

export const deletePersona = async (id) => {
    try {
        const url = urlBasePersona;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: id})
        });
        const data = await res.text();

        if (!res.ok) {
            throw new Error(data);
        }
        
        //devuelve texto
        return data;
    } catch (err) {
        console.log(err.message);
        console.log(err);
        throw err;
    }
}

export const crearPersona = (persona) => {
    //throw new Error('fallo data');
    
    const url = urlBasePersona;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(persona)
    });
}

export const modificarPersona = async (persona) => {
    
    const url = urlBasePersona;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(persona)
    });
}

/*
export const modificarPersona = async (persona) => {
    try {
        const url = urlBasePersona;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(persona)
        });

        const data = await res.text();
        if (!res.ok) {
            throw new Error(data);
        }
        return data;
    } catch (err) {
        console.log(err.message);
        console.log(err);
        throw err;
    }
}*/