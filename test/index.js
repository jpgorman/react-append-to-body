import "jsdom-global/register"
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
      {children}
    </div>
  )
}

function mockRender(Component) {
  ReactDOM.render(Component, document.createElement("div"))
}


  const mockAppRoot = document.createElement("div")
  mockAppRoot.setAttribute("id", "app")
  const mockAppendRoot = document.createElement("div")
  mockAppendRoot.setAttribute("id", "append-element-container")
  document.body.appendChild(mockAppRoot)
  document.body.appendChild(mockAppendRoot)

describe("invert-animation plugin", () => {

  describe("componentWillAppendToBody", () => {
    let mockAppRoot
    let mockAppendRoot

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(document.querySelector("#app"))
      ReactDOM.unmountComponentAtNode(document.querySelector("#append-element-container"))
    })

    it("should append component to 'append-element-container' by default", () => {
      const AppendedModal = componentWillAppendToBody(MockModal)
      mockRender(<AppendedModal>foo</AppendedModal>)
      const actual = document.getElementById("append-element-container").innerHTML
      const expected = `<span data-reactroot=""><div class="modal__container">foo</div></span>`
      expect(actual).to.eql(expected)
    })

    it("should append multiple instances of component to 'append-element-container' by default", () => {
      const FirstAppendedModal = componentWillAppendToBody(MockModal)
      const SecondAppendedModal = componentWillAppendToBody(MockModal)
      mockRender(
        <MockApp>
          <FirstAppendedModal>foo</FirstAppendedModal>
          <SecondAppendedModal>bar</SecondAppendedModal>
        </MockApp>
      )
      const actual = document.querySelector("#append-element-container").innerHTML
      const expected = `<span data-reactroot=""><div class="modal__container">foo</div><div class="modal__container">bar</div></span>`

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
