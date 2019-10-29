import React from "react"

const Category = props => {
    return (
        <>
            <section>
                <button onClick={() => props.getCategories(props.category.id)}>
                    {props.category.name}
                </button>
            </section>
        </>
    )
}
export default Category