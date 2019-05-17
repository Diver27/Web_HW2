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
    trObj1.append(thObj0, thObj1, thObj2, thObj3);
    tableObj.appendChild(trObj1);

    /**
     * 生成列表内容
     */
        //var filmList = filmsJson['films'];
    var filmList = filmsJson;
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
        trObj.append(posterObj, titleObj, ratingObj, directorObj);
        tableObj.appendChild(trObj);
    }

    list.innerHTML = "";
    list.appendChild(tableObj);
}

function goToPage(num, pageCount) {

    var totalPage = pageCount;
    var pageSize = 50;

    var currentPage = num;
    var startRow = 1;
    var endRow = pageSize;
    endRow = (endRow > length) ? length : endRow;
    /**
     * 创建导航页签
     * @type {string}
     */
    var paginationInfo = "<ul class=\"pagination\" >" +
        "<li><a href=\"javascript:void(0);\" " +
        " onclick=\"goToPage(" + (currentPage - 1) + " , " + totalPage + ")\"" + ">«</a></li>";

    if (totalPage <= 10) {
        for (var i = 1; i <= totalPage; i++) {
            paginationInfo += "<li><a href=\"javascript:void(0);\" " +
                " onclick=\"goToPage(" + i + " , " + totalPage + ")\">" + i + "</a></li>";
        }
    } else {
        if (currentPage <= 3) {
            for (var i = 1; i <= currentPage + 2; i++) {
                paginationInfo += "<li><a href=\"javascript:void(0);\" " +
                    " onclick=\"goToPage(" + i + " , " + totalPage + ")\">" + i + "</a></li>";
            }
            paginationInfo += "<li><a href=\"#\">...</a></li>";
            paginationInfo += "<li><a href=\"javascript:void(0);\" " +
                " onclick=\"goToPage(" + totalPage + " , " + totalPage + ")\">" + totalPage + "</a></li>";
        } else if (currentPage <= totalPage - 5) {
            paginationInfo += "<li><a href=\"javascript:void(0);\" " +
                " onclick=\"goToPage(" + 1 + " , " + totalPage + ")\">" + 1 + "</a></li>";

            paginationInfo += "<li><a href=\"#\">...</a></li>";
            for (var i = currentPage - 1; i <= currentPage + 2; i++) {
                paginationInfo += "<li><a href=\"javascript:void(0);\" " + " onclick=\"goToPage(" + i + " , " + totalPage + ")\">" + i + "</a></li>";
            }
            paginationInfo += "<li><a href=\"#\">...</a></li>";
            paginationInfo += "<li><a href=\"javascript:void(0);\" " + " onclick=\"goToPage(" + totalPage + " , " + totalPage + ")\">" + totalPage + "</a></li>";
        } else {
            paginationInfo += "<li><a href=\"javascript:void(0);\" " + " onclick=\"goToPage(" + 1 + " , " + totalPage + ")\">" + 1 + "</a></li>";
            paginationInfo += "<li><a href=\"#\">...</a></li>";
            for (var i = currentPage - 1; i <= totalPage; i++) {
                paginationInfo += "<li><a href=\"javascript:void(0);\" " + " onclick=\"goToPage(" + i + " , " + totalPage + ")\">" + i + "</a></li>";
            }
        }
    }

    paginationInfo += "<li><a href=\"javascript:void(0);\" " + " onclick=\"goToPage(" + (currentPage + 1) + " , " + totalPage + ")\"" + ">»</a></li>";
    document.getElementById("page").innerHTML = paginationInfo;

    /**
     * 获取页面内容
     * @type {string}
     */
    var requestURL = 'getData.php?action=goToPage&pageNum=' + num.toString();
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();

    request.onload = function () {
        var filmJSON = JSON.parse(request.response);
        newTable(filmJSON);
    }
}

window.onload = function getPageCount() {
    var requestURL = 'getData.php?action=getPageCount';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();

    request.onload = function () {
        var pageCount = request.response;
        goToPage(1, pageCount);
    }
}