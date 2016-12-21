var cleanup = require('jsdom-global')()
import 'jsdom-global/register'
import chai from "chai"
import React from "react"
import ReactDOM from "react-dom"
const expect = chai.expect
import {componentWillAppendToBody} from "../src/index"

function MockModal({children}) {
  return (
    <div className="modal__container">
      {children}
    </div>
  )
}

function MockApp({children}) {
  return (
    <div>
      Some content on my page
      {children}
    </div>
  )
}

function mockRender(Component) {
  ReactDOM.render((Component), document.createElement("div"))
}

describe("invert-animation plugin", () => {

  describe("componentWillAppendToBody", () => {

    beforeEach(() => {
      const mockAppRoot = document.createElement('div')
      mockAppRoot.setAttribute("id", "app")
      const mockAppendRoot = document.createElement('div')
      mockAppendRoot.setAttribute("id", "append-element-container")
      document.body.appendChild(mockAppRoot)
      document.body.appendChild(mockAppendRoot)
    })

    afterEach(() => {
      // cleanup()
    })

    it("should append component to 'append-element-container' by default", () => {
      const AppendedModal = componentWillAppendToBody(MockModal)
      mockRender(<AppendedModal>foo</AppendedModal>)
      const actual = document.getElementById("append-element-container").innerHTML
      const expected = `<span data-reactroot=""><div class="modal__container">foo</div></span>`
      expect(actual).to.eql(expected)
    })

    it("should append component to name DOM Container when supplied via 'appendElementContainer' prop", () => {
      const AppendedModal = componentWillAppendToBody(MockModal)
      mockRender(<AppendedModal appendElementContainer={"#app"}>foo</AppendedModal>)
      const actual = document.getElementById("app").innerHTML
      const expected = `<span data-reactroot=""><div class="modal__container">foo</div></span>`
      expect(actual).to.eql(expected)
    })
  })
})
