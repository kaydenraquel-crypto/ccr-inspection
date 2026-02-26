/* ============================================
   Signature Pad
   Canvas-based signature capture with touch/mouse
   ============================================ */

var SignaturePad = (function() {

  function create(canvas) {
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var lastX = 0;
    var lastY = 0;
    var isEmpty = true;

    function resizeCanvas() {
      var rect = canvas.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.strokeStyle = '#17494F';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    function getPos(e) {
      var rect = canvas.getBoundingClientRect();
      var touch = e.touches ? e.touches[0] : e;
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }

    function startDraw(e) {
      e.preventDefault();
      drawing = true;
      var pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
    }

    function draw(e) {
      if (!drawing) return;
      e.preventDefault();
      var pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastX = pos.x;
      lastY = pos.y;
      isEmpty = false;
    }

    function endDraw(e) {
      if (drawing) {
        e.preventDefault();
        drawing = false;
      }
    }

    // Touch events
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', endDraw, { passive: false });
    canvas.addEventListener('touchcancel', endDraw, { passive: false });

    // Mouse events
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', endDraw);

    resizeCanvas();

    return {
      clear: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isEmpty = true;
      },
      isEmpty: function() {
        return isEmpty;
      },
      toDataURL: function() {
        if (isEmpty) return null;
        return canvas.toDataURL('image/png');
      },
      resize: resizeCanvas
    };
  }

  return {
    create: create
  };
})();
