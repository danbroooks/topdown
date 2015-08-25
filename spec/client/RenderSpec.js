var sinon = require('sinon');

describe("Render", function() {

  var Render = require('../../src/client/Render');

  describe("Factory", function () {
    it("should return new instance", function () {
      expect(Render() instanceof Render.Constructor).toBeTruthy();
    });

    it("should store passed document object", function(){
      var doc = {};
      expect(Render(doc).document).toEqual(doc);
    });
  });

  describe(".addLayer(name)", function () {

    beforeEach(function () {
      this.body = {};
      this.body.appendChild = sinon.stub();

      this.canvas = {};

      this.document = {};
      this.document.getElementsByTagName = sinon.stub();
      this.document.getElementsByTagName.returns([this.body]);
      this.document.createElement = sinon.stub();
      this.document.createElement.returns(this.canvas);
    });

    it("should add a new canvas to the body of the document", function () {
      Render(this.document).addLayer('foreground');
      expect(this.document.getElementsByTagName.calledOnce).toBeTruthy();
      expect(this.document.getElementsByTagName.calledWith('body')).toBeTruthy();
      expect(this.body.appendChild.calledOnce).toBeTruthy();
      expect(this.body.appendChild.calledWith(this.canvas)).toBeTruthy();
    });

    it("should generate new canvas object, and assign an ID matching the name received as argument", function () {
      Render(this.document).addLayer('foreground');
      expect(this.document.createElement.calledWith('canvas')).toBeTruthy();
      expect(this.canvas.id).toEqual('foreground');
    });

  });



});
