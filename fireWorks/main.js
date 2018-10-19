var ACCOUNT_PARTICLE_COUNT = 25;
var ACCOUNT_RADIUS = 20;
var particleNumber = 0;
var clickCount = 0;

function Point() {
    this.x = 0;
    this.y = 0;
}

Point.prototype.distance = function (p) {
    var q = new Point();
    q.x = p.x - this.x;
    q.y = p.y - this.y;
    return q;
};

Point.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Point.prototype.normalize = function () {
    var i = this.length();
    if (i > 0) {
        var j = 1 / i;
        this.x *= j;
        this.y *= j;
    }
};

$('.myaccount').on('click', function () {
    onclickEvent($(this).offset().left, $(this).offset().top)
});

function onclickEvent(left, top) {
    var parentCenterPos = new Point();
    parentCenterPos.x = left + ACCOUNT_RADIUS;
    parentCenterPos.y = top + ACCOUNT_RADIUS;

    var lineColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    for (var i = 0; i < ACCOUNT_PARTICLE_COUNT; i++) {
        var childCenterPos = new Point();
        ang = 2 / ACCOUNT_PARTICLE_COUNT * i * Math.PI;

        randomLength = (Math.random() * 100 % 1000);
        // randomLength = 0
        x = Math.cos(ang) * (ACCOUNT_RADIUS * 6 + randomLength);
        y = Math.sin(ang) * (ACCOUNT_RADIUS * 6 + randomLength);
        childCenterPos.x = parentCenterPos.x + x;
        childCenterPos.y = parentCenterPos.y + y;

        createLine(childCenterPos.x, childCenterPos.y, parentCenterPos.x, parentCenterPos.y, lineColor);
        $('body').append(
            '<div class="account" id="' + particleNumber + '">' +
            '<img src="903824.png" width="40" height="40">' +
            '<p>hello mynamfdjafkldasjflkasjdfklse</p>' +
            '</div>'
        );

        $('#' + particleNumber).css({
            'top': childCenterPos.y - ACCOUNT_RADIUS,
            'left': childCenterPos.x - ACCOUNT_RADIUS,

        });
        update(particleNumber, childCenterPos.x - ACCOUNT_RADIUS, childCenterPos.y - ACCOUNT_RADIUS);

        particleNumber++;
    }

    clickCount++;
}
function update(number, left, top) {
    $('#' + number).on('click', function () {
        $('#' + number + ' img').attr({
            'width': '50',
            'height': '50',
        });
        $('#' + number + ' img').css({
            'border-radius': '25px'
        })
        $(this).css({
            'left': $(this).offset().left - 5,
            'top': $(this).offset().top - 5,
        })
        onclickEvent(left, top)
    }
    );
}

var COLORS = ['orange', 'blue', 'white', 'green', 'red', 'violet', 'yellow', 'pink', 'aqua'];
function createLine(x1, y1, x2, y2, color) {
    var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    var transform = 'rotate(' + angle + 'deg)';

    var line = $('<div>')
        .appendTo('body')
        .addClass('line')
        .css({
            'position': 'absolute',
            'background-color': color,
            'opacity': 0.5
        })
        .width(length)
        .offset({ left: x1, top: y1 });

    transformLine(line, transform);
    return line;
}
function transformLine(line, transform) {
    line.css('transform', transform);
}