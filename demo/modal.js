/* eslint-disable react/prop-types */
import React from "react"

export function Modal({children, handler}) {
  const style = {
    outer: {
      border: "1px solid rgba(255, 0, 0, 1)",
      position: "relative",
    },
    inner: {
      padding: 100,
      background: "white",
      boxShadow: "2px 2px 3px 0px rgba(0,0,0,0.5)",
    }
  }
  return (
    <div style={style.outer} onClick={handler}>
      <div style={style.inner}>
        {children}
      </div>
    </div>
  )
}
