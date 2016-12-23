/* eslint-disable react/prop-types */
import "jsdom-global/register"
import chai from "chai"
import React from "react"
import ReactDOM from "react-dom"
const expect = chai.expect
import {
  componentWillAppendToBody,
  unMountComponentWillAppendToBody,
} from "../src/index"

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


describe("react-append-to-body", () => {

  describe("componentWillAppendToBody", () => {

    beforeEach(() => {
      const mockAppRoot = document.createElement("div")
      mockAppRoot.setAttribute("id", "app")
      document.body.appendChild(mockAppRoot)
    })

    afterEach(() => {
      document.body.innerHTML = ""
      unMountComponentWillAppendToBody()
    })

    it("should be a function", () => {
      expect(componentWillAppendToBody).to.be.instanceOf(Function)
    })

    it("should attach default container DOM node to the document if non-exists", () => {
      expect(document.querySelector("#append-element-container")).to.eq(null)
      const AppendedModal = componentWillAppendToBody(MockModal)
      mockRender(<AppendedModal>foo</AppendedModal>)
      expect(document.querySelector("#append-element-container")).to.not.eq(null)
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

    it("should NOT attach default container DOM node to the document if `appendElementContainer` prop is supplied", () => {
      expect(document.querySelector("#append-element-container")).to.eq(null)
      const AppendedModal = componentWillAppendToBody(MockModal)
      mockRender(<AppendedModal appendElementContainer={"#app"}>foo</AppendedModal>)
      expect(document.querySelector("#append-element-container")).to.eq(null)

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
