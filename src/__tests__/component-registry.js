/* eslint-disable react/prop-types */
import "jsdom-global/register";
import { stub } from "sinon";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
chai.should();
chai.use(sinonChai);

import { componentRegistry as registerFactory } from "../component-registry";

describe("componentRegistry", function() {
  beforeEach(() => {
    this.MOCK_RENDERER = stub();
    this.MOCK_DOM_RECONCILER = {
      containerExists: stub().returns(true),
      unMountContainer: stub()
    };
    this.registry = registerFactory(
      this.MOCK_DOM_RECONCILER,
      this.MOCK_RENDERER
    );
  });

  describe("adding Element", () => {
    beforeEach(() => {
      this.MOCK_REGISTRY = {};
      const { updateElement } = this.registry(this.MOCK_REGISTRY);
      this.updateElement = updateElement;
      this.expected = {
        foo: {
          element: "bar",
          selector: "baz"
        }
      };
    });
    it("should add element to registry", () => {
      const actual = this.MOCK_REGISTRY;
      this.updateElement("foo", "bar", "baz");
      expect(actual).to.eql(this.expected);
    });
    it("should render the registry", () => {
      const actual = this.MOCK_REGISTRY;
      this.updateElement("foo", "bar", "baz");
      expect(actual).to.eql(this.expected);
      expect(this.MOCK_RENDERER).to.have.been.calledOnce;
      expect(this.MOCK_RENDERER).to.have.been.calledWith(this.expected);
    });
  });

  describe("updating Element", () => {
    beforeEach(() => {
      this.MOCK_REGISTRY = {
        foo: {
          element: "bar",
          selector: "baz"
        }
      };
      const { updateElement } = this.registry(this.MOCK_REGISTRY);
      this.updateElement = updateElement;
    });
    it("should update existing in registry", () => {
      const actual = this.MOCK_REGISTRY;
      const expected = {
        foo: {
          element: "BAR",
          selector: "baz"
        }
      };
      this.updateElement("foo", "BAR");
      expect(actual).to.eql(expected);
    });
    it("should render the registry", () => {
      const expected = {
        foo: {
          element: "BAR",
          selector: "baz"
        }
      };
      this.updateElement("foo", "BAR");
      expect(this.MOCK_RENDERER).to.have.been.calledOnce;
      expect(this.MOCK_RENDERER).to.have.been.calledWith(expected);
    });
  });

  describe("deleteElement", () => {
    beforeEach(() => {
      this.MOCK_REGISTRY = {
        foo: {
          element: "BAR",
          selector: "baz"
        }
      };
      const { deleteElement } = this.registry(this.MOCK_REGISTRY);
      this.deleteElement = deleteElement;
    });
    it("should remove an existing element from the registry", () => {
      const actual = this.MOCK_REGISTRY;
      const expected = {};
      this.deleteElement("foo");
      expect(actual).to.eql(expected);
    });
    it("should check if element exists", () => {
      this.deleteElement("foo");
      expect(this.MOCK_DOM_RECONCILER.containerExists).to.have.been.calledOnce;
    });
    it("should unmount the elements contaner", () => {
      this.deleteElement("foo");
      expect(this.MOCK_DOM_RECONCILER.unMountContainer).to.have.been.calledOnce;
    });
    it("should render the registry", () => {
      this.deleteElement("foo");
      expect(this.MOCK_RENDERER).to.have.been.calledOnce;
    });
  });
});
