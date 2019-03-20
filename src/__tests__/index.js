/* eslint-disable react/prop-types */
import "jsdom-global/register";
import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";

const expect = chai.expect;
import {
  componentWillAppendToBody,
  unMountComponentWillAppendToBody
} from "../../dist/main";

function MockModal({ children }) {
  return <div className="modal__container">{children}</div>;
}

function MockApp({ children }) {
  return <div>{children}</div>;
}

function mockRender(Component) {
  ReactDOM.render(Component, document.createElement("div"));
}

describe("react-append-to-body", () => {
  describe("componentWillAppendToBody", () => {
    beforeEach(() => {
      const mockAppRoot = document.createElement("div");
      mockAppRoot.setAttribute("id", "app");
      document.body.appendChild(mockAppRoot);
    });

    afterEach(() => {
      document.body.innerHTML = "";
      unMountComponentWillAppendToBody();
    });

    it("should be a function", () => {
      expect(componentWillAppendToBody).to.be.instanceOf(Function);
    });

    it("should attach default container DOM node to the document if non-exists", () => {
      expect(document.querySelector("#subtree-container")).to.eq(null);
      const AppendedModal = componentWillAppendToBody(MockModal);
      mockRender(<AppendedModal>foo</AppendedModal>);
      expect(document.querySelector("#subtree-container")).to.not.eq(null);
    });

    it("should append component to 'subtree-container' by default", () => {
      const AppendedModal = componentWillAppendToBody(MockModal);
      mockRender(<AppendedModal>foo</AppendedModal>);
      const actual = document.getElementById("subtree-container").innerHTML;
      expect(actual).to.include("foo");
    });

    it("should append multiple instances of component to 'subtree-container' by default", () => {
      const FirstAppendedModal = componentWillAppendToBody(MockModal);
      const SecondAppendedModal = componentWillAppendToBody(MockModal);
      mockRender(
        <MockApp>
          <FirstAppendedModal>foo</FirstAppendedModal>
          <SecondAppendedModal>bar</SecondAppendedModal>
        </MockApp>
      );

      const actual = document.querySelector("#subtree-container").innerHTML;
      expect(actual).to.include("bar");
      expect(actual).to.include("foo");
    });

    it("should NOT attach default container DOM node to the document if `subtreeContainer` prop is supplied", () => {
      expect(document.querySelector("#subtree-container")).to.eq(null);
      const AppendedModal = componentWillAppendToBody(MockModal);
      mockRender(<AppendedModal subtreeContainer={"#app"}>foo</AppendedModal>);
      expect(document.querySelector("#subtree-container")).to.eq(null);
    });

    it("should append component to name DOM Container when supplied via 'subtreeContainer' prop", () => {
      const AppendedModal = componentWillAppendToBody(MockModal);
      mockRender(<AppendedModal subtreeContainer={"#app"}>foo</AppendedModal>);
      const actual = document.getElementById("app").innerHTML;
      expect(actual).to.include("foo");
    });
  });
});
