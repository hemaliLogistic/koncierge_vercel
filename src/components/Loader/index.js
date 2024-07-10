import React from 'react'

const Loader = () => {
    return (
        <div className="flex gap-4 flex-wrap justify-center pt-56">
            <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" />
        </div>
    )

}

export default Loader;