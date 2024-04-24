

async function borrarCliente(id){
    try {
            const response = await fetch("/user/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id }) // Enviar el ID como objeto JSON
        });
        if (response.ok) {
            // Recargar la página después de eliminar exitosamente
            window.location.reload();
        } else {
            console.error('Error al eliminar cliente:', response.statusText);
        }
    }  catch (error) {
        console.error('Error al eliminar cliente:', error);
    }

}