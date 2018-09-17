var Game = Game || {};
Game.gFieldWidth = 1200;
Game.gFieldHeight = 900;
Game.gCell = 30;
Game.hazardSpeed = 50;
Game.gLineCellsX = Game.gFieldWidth / Game.gCell;
Game.gLineCellsY = Game.gFieldHeight / Game.gCell;

Game.initialize = function() {
    var $gField = $('#gField');

    $gField.css({
        'background-color': 'red',
        'width': toPixel(Game.gFieldWidth),
        'height': toPixel(Game.gFieldHeight)
    });
    for (var i = 0; i < Game.gLineCellsY; i++) {
        $gField.append('<div class="line" id="line-' + i + '" style="width: 100%; height: ' + toPixel(Game.gCell) + '">\n' +
            '</div>');
        for (var j = 0; j < Game.gLineCellsX; j++) {
            var $line = $('#line-' + i);
            var cellId = (Game.gLineCellsX * i + j);
            $line.append('<span class="cell" id="cell-' + cellId + '"></span>');
            $('#cell-' + cellId).hover(function() {
                $(this).css({
                    'background-color': 'blue'
                });
                Hazard.bottomRight($(this), HazardType.bullet);
            });
            // $('#cell-' + cellId).click(function() {
            //     $(this).css({
            //         'background-color': 'blue'
            //     });
            //     Hazard.topRightAllow($(this), HazardType.bullet);
            //     setTimeout(() => {
            //         Hazard.topRightAllow($(this), HazardType.bullet);
            //     }, 100);
            // });
            $('#cell-' + cellId).click(function() {
                $(this).css({
                    'background-color': 'blue'
                });
                Hazard.topDrill($(this), HazardType.bullet);
                setTimeout(() => {
                    Hazard.topDrill($(this), HazardType.bullet);
                }, 100);
            });
        }
    }

    var $cells = $('.cell');
    $cells.css({
        'width': toPixel(Game.gCell - 1),
        'height': toPixel(Game.gCell - 1),
        'display': 'inline-block',
        'border': 'solid 0.5px #fff'
    });
}

var toPixel = function(size) {
    return size + 'px';
}
Game.getCellId = function($cell) {
    return parseInt($cell.attr('id').slice(5));
}

var Hazard = Hazard || {};
var HazardType = HazardType || {};
HazardType.bullet = 1;
HazardType.razer = 2;
Hazard.GO_END = 1000;

HazardType.action = function($cell, hazardType) {
    if (hazardType === HazardType.bullet) {
        $cell.css('background-color', 'red');
    }
}

Hazard.cross = function($cell) {
    Hazard.top($cell, HazardType.bullet, Hazard.GO_END);
    Hazard.bottom($cell, HazardType.bullet, Hazard.GO_END);
    Hazard.left($cell, HazardType.bullet, Hazard.GO_END);
    Hazard.right($cell, HazardType.bullet, Hazard.GO_END);
}
Hazard.top = function($cell, hazardType, goEnd) {
    setTimeout(() => {
        var idNumber = Game.getCellId($cell);
        var topCellIdNumber = idNumber - Game.gLineCellsX;

        HazardType.action($cell, hazardType);
        if (topCellIdNumber >= 0) {
            console.log(topCellIdNumber);
            var $cellTop = $('#cell-' + topCellIdNumber);

            $cellTop.css('background-color', 'blue');

            if (goEnd) {
                goEnd--;
                Hazard.top($cellTop, hazardType, goEnd);
            } else {
                $cellTop.css('background-color', 'red');
            }
        }
    }, Game.hazardSpeed);
}
Hazard.bottom = function($cell, hazardType, goEnd) {
    setTimeout(() => {
        var idNumber = Game.getCellId($cell);
        var bottomCellIdNumber = idNumber + Game.gLineCellsX;
        HazardType.action($cell, hazardType);
        if (bottomCellIdNumber < Game.gLineCellsX * Game.gLineCellsY) {
            var $cellBottom = $('#cell-' + bottomCellIdNumber);

            $cellBottom.css('background-color', 'blue');

            if (goEnd) {
                goEnd--;
                Hazard.bottom($cellBottom, hazardType, goEnd);
            } else {
                $cellBottom.css('background-color', 'red');
            }
        }
    }, Game.hazardSpeed);
}
Hazard.left = function($cell, hazardType, goEnd) {
    setTimeout(() => {
        var $cellPrev = $cell.prev();
        HazardType.action($cell, hazardType);
        if ($cellPrev.length) {

            $cellPrev.css('background-color', 'blue');
            if (goEnd) {
                goEnd--;
                Hazard.left($cellPrev, hazardType, goEnd);
            } else {
                $cellPrev.css('background-color', 'red');
            }
        }
    }, Game.hazardSpeed);
}
Hazard.right = function($cell, hazardType, goEnd) {
    setTimeout(() => {
        var $cellNext = $cell.next();
        HazardType.action($cell, hazardType);
        if ($cellNext.length) {
            $cellNext.css('background-color', 'blue');
            if (goEnd) {
                goEnd--;
                Hazard.right($cellNext, hazardType, goEnd);
            } else {
                $cellNext.css('background-color', 'red');
            }
        }
    }, Game.hazardSpeed);
}
Hazard.horizontal = function($cell) {
    Hazard.right($cell);
    Hazard.left($cell);
}
Hazard.topRight = function($cell, hazardType) {
    setTimeout(() => {
        var idNumber = Game.getCellId($cell);
        var topCellIdNumber = idNumber - Game.gLineCellsX + 1;

        HazardType.action($cell, hazardType);
        if (topCellIdNumber >= 0) {
            console.log(topCellIdNumber);
            var $cellTop = $('#cell-' + topCellIdNumber);

            $cellTop.css('background-color', 'blue');
            Hazard.topRight($cellTop, hazardType);
        }
    }, Game.hazardSpeed);
}
Hazard.topLeft = function($cell, hazardType) {
    setTimeout(() => {
        var idNumber = Game.getCellId($cell);
        var topCellIdNumber = idNumber - Game.gLineCellsX - 1;

        HazardType.action($cell, hazardType);
        if (topCellIdNumber >= 0) {
            console.log(topCellIdNumber);
            var $cellTop = $('#cell-' + topCellIdNumber);

            $cellTop.css('background-color', 'blue');
            Hazard.topLeft($cellTop, hazardType);
        }
    }, Game.hazardSpeed);
}
Hazard.bottomLeft = function($cell, hazardType) {
    setTimeout(() => {
        var idNumber = Game.getCellId($cell);
        var topCellIdNumber = idNumber + Game.gLineCellsX - 1;

        HazardType.action($cell, hazardType);
        if (topCellIdNumber >= 0) {
            console.log(topCellIdNumber);
            var $cellTop = $('#cell-' + topCellIdNumber);

            $cellTop.css('background-color', 'blue');
            Hazard.bottomLeft($cellTop, hazardType);
        }
    }, Game.hazardSpeed);
}
Hazard.bottomRight = function($cell, hazardType) {
    setTimeout(() => {
        var idNumber = Game.getCellId($cell);
        var topCellIdNumber = idNumber + Game.gLineCellsX + 1;

        HazardType.action($cell, hazardType);
        if (topCellIdNumber >= 0) {
            console.log(topCellIdNumber);
            var $cellTop = $('#cell-' + topCellIdNumber);

            $cellTop.css('background-color', 'blue');
            Hazard.bottomRight($cellTop, hazardType);
        }
    }, Game.hazardSpeed);
}
Hazard.topRightAllow = function($cell, hazardType, recursiveCount = 0) {
    setTimeout(() => {
        var idNumber = Game.getCellId($cell);
        var topCellIdNumber = idNumber - Game.gLineCellsX + 1;

        HazardType.action($cell, hazardType);
        if (topCellIdNumber >= 0) {
            console.log(topCellIdNumber);
            var $cellNext = $('#cell-' + topCellIdNumber);

            $cellNext.css('background-color', 'blue');

            // 下の波を描画
            Hazard.bottom($cellNext, hazardType, recursiveCount);
            // 左の波を描画
            Hazard.left($cellNext, hazardType, recursiveCount);

            recursiveCount++;
            Hazard.topRightAllow($cellNext, hazardType, recursiveCount);
        }
    }, Game.hazardSpeed);
}
Hazard.topLeftAllow = function($cell, hazardType, recursiveCount = 0) {
    setTimeout(() => {
        var idNumber = Game.getCellId($cell);
        var topCellIdNumber = idNumber - Game.gLineCellsX - 1;

        HazardType.action($cell, hazardType);
        if (topCellIdNumber >= 0) {
            console.log(topCellIdNumber);
            var $cellNext = $('#cell-' + topCellIdNumber);

            $cellNext.css('background-color', 'blue');

            // 下の波を描画
            Hazard.bottom($cellNext, hazardType, recursiveCount);
            // 右の波を描画
            Hazard.right($cellNext, hazardType, recursiveCount);

            recursiveCount++;
            Hazard.topLeftAllow($cellNext, hazardType, recursiveCount);
        }
    }, Game.hazardSpeed);
}
Hazard.topDrill = function($cell, hazardType, recursiveCount = 0) {
    Hazard.topLeftAllow($cell, hazardType, recursiveCount);
    recursiveCount = 0;
    Hazard.topRightAllow($cell, hazardType, recursiveCount);
}

Hazard.square = function($cell) {

}