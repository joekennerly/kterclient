import React from "react"
import Category from "./Category"

const CategoryList = props => {
    return (
        <>
            {props.categories.map(category=><Category key={category.id} getCategories={props.getCategories} category={category} />)}
        </>
    )
}
export default CategoryList