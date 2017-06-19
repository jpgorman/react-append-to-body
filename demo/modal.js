/* eslint-disable react/prop-types */
import React from "react"

export function Modal({children}) {
  const style = {
    outer: {
      borderRadius: 4,
      minWidth: 500,
      maxWidth: 500,
      boxShadow: "0 2px 5px 0 rgba(91,91,91,1)",
      position: "relative",
      border: "2px solid red",
    },
    inner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 20,
      background: "white",
    }
  }
  return (
    <div style={style.outer}>
      <div style={style.inner}>
        {children}
      </div>
    </div>
  )
}
