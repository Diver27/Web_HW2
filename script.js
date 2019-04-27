var list = document.getElementById("list");

function newTable(filmsJson) {
    var tableObj = document.createElement("table");
    tableObj.setAttribute("id", "filmList");

    /**
     * 创建Header
     * @type {HTMLTableRowElement}
     */
    var trObj1 = document.createElement("tr");
    var thObj0 = document.createElement("th");
    var thObj1 = document.createElement("th");
    var thObj2 = document.createElement("th");
    var thObj3 = document.createElement("th");
    thObj0.append("");
    thObj1.append("影片名");
    thObj2.append("评分");
    thObj3.append("导演");
    trObj1.append(thObj0, thObj1, thObj2,thObj3);
    tableObj.appendChild(trObj1);

    /**
     * 生成列表内容
     */
    var filmList = filmsJson['films'];
    for (var i = 0; i < filmList.length; i++) {
        var trObj = document.createElement("tr");
        var posterObj = document.createElement("td");
        var titleObj = document.createElement("td");
        var ratingObj = document.createElement("td");
        var directorObj = document.createElement("td");
        var posterImg = document.createElement("img");
        posterImg.src = filmList[i].poster;
        posterImg.onerror = function () {
            this.src = "https://www.valmorgan.com.au/wp-content/uploads/2016/06/default-movie-1-3.jpg";
        }
        posterObj.appendChild(posterImg);
        //posterObj.innerHTML="<src="
        titleObj.append(filmList[i].title);
        ratingObj.append(filmList[i].rating.average);
        directorObj.append(filmList[i].directors[0].name);
        trObj.append(posterObj, titleObj, ratingObj,directorObj);
        tableObj.appendChild(trObj);
    }
    list.appendChild(tableObj);


}

window.onload = function getJson() {
    var requestURL = './films.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();

    request.onload = function () {
        var filmsJson = JSON.parse(request.response);
        newTable(filmsJson);
        goToPage(1);
    }
}

function goToPage(num) {
    var tableObj = document.getElementById("filmList");
    var length = tableObj.rows.length;
    var totalPage;
    var pageSize = 50;

    if (length / pageSize > parseInt(length / pageSize)) {
        totalPage = parseInt(length / pageSize) + 1;
    } else {
        totalPage = parseInt(length / pageSize);
    }

    var currentPage = num;
    var startRow = (currentPage - 1) * pageSize + 1;
    var endRow = currentPage * pageSize;
    endRow = (endRow > length) ? length : endRow;

    for (var i = 1; i < (length + 1); i++) {
        var irow = tableObj.rows[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "";
        } else {
            irow.style.display = "none";
        }
    }
    var tempStr = "";
    if (currentPage > 1) {
        tempStr += "<li><a href=\"#\" onClick=\"goToPage(" + (currentPage - 1) + "," + pageSize + ")\"><上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>";
        // for (var j = 1; j <= totalPage; j++) {
        //     tempStr += "<li><a href=\"#\" onClick=\"goPage(" + j + "," + pageSize + ")\">" + j + "&nbsp;&nbsp;&nbsp;</a></li>"
        // }
    } else {
        tempStr += "<li><a><上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>";
    }
    for (var j = 1; j <= totalPage; j++) {
        if (j == currentPage) {
            tempStr += "<li><a class=\"active\" href=\"#\" onClick=\"goToPage(" + j + ")\">" + j + "&nbsp;&nbsp;&nbsp;</a></li>"
            continue;
        }
        tempStr += "<li><a href=\"#\" onClick=\"goToPage(" + j + ")\">" + j + "&nbsp;&nbsp;&nbsp;</a></li>"
    }
    if (currentPage < totalPage) {
        tempStr += "<li><a href=\"#\" onClick=\"goToPage(" + (currentPage + 1) + ")\">下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>";
        // for (var j = 1; j <= totalPage; j++) {
        //     tempStr += "<li><a href=\"#\" onClick=\"goPage(" + j + "," + pageSize + ")\">" + j + "&nbsp;&nbsp;&nbsp;</a></li>"
        // }
    } else {
        tempStr += "<li><a>下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>";
    }

    document.getElementById("page").innerHTML = tempStr;
}