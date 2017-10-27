var TopDestinations = TopDestinations || {};
document.addEventListener("DOMContentLoaded", function() {

    (function(component) {
        component.init = function() {
            _createPanel();
        }

        var _createPanel = function() {
            var _element = document.getElementById('panels');
            var _panels = document.createDocumentFragment();
            var _list = hotelLists.country;
            var _listLength = _list.length;
            var _toggleClass = "show";
            let index = 0;

            while (index < _listLength) {
                if (index !== 0) {
                    _toggleClass = "hide";
                }
                var str = '';
                var li = document.createElement('li');
                li.className = "panel_list";
                var div = document.createElement('div');
                div.className = "panel_element";
                str += '<div class="panel_header" ><div class="wrap toggle"><div class="panel_title ' + _toggleClass + ' toggle"><a href="#" class="text_blue text_large toggle">' + _list[index].city + ',' + _list[index].name + '</a></div>';
                str += '<div class="panel_info text_gray text_small toggle">Over ' + _list[index].count + ' Hotels</div></div></div>';
                if (_list[index].hotels) {
                    let hotels = _list[index].hotels;
                    let hotelCount = hotels.length;
                    let count = 0;

                    str += '<ul class="panel_content ' + _toggleClass + '">';


                    while (count < hotelCount) {
                        str += '<li class="panel_item wrap text_small">';
                        str += '<div class="col-10 "><a href="#" class="panel_link text_blue">' + hotels[count].name + '</a></div><div class="col-2"><span class="rating">' + hotels[count].stars + '</span>';
                        if (hotels[count].to !== 'NA') {
                            str += '<span>From <strike>' + hotels[count].from + '</strike></span><span class="text_green">' + hotels[count].to + '</span>';
                        } else {
                            str += '<span>From  <span class="text_green">' + hotels[count].from + '</span></span>';
                        }
                        str += '</div></li>';

                        count++;
                    }
                    str += '<li class="panel_link wrap"><a href="#" class="text_blue text_medium" >See all ' + _list[index].count + ' hotels in ' + _list[index].city + '</a></li>';
                    str += '</ul>';

                }
                div.innerHTML = str;
                li.appendChild(div);
                _element.appendChild(li);
                index++;
            }
            _addEvents();
        }

        var _addEvents = function() {
            var element = document.querySelector('.panels');
            element.addEventListener('click', _toggle);

        }

        var _toggle = function(event) {
			let className = "toggle";
            let parent = "panel_element";
            if (_hasClass(event.target, className)) {
                let parentElement = closestByClass(event.target, parent);
                let icon = parentElement.querySelector('.panel_title ');
                let content = parentElement.querySelector('.panel_content');
                _toggleClass(icon);
                _toggleClass(content);

            }

        };

        var _toggleClass = function(content) {
            if (_hasClass(content, "show")) {
                _removeClass(content, "show");
                _addClass(content, "hide");
            } else if (_hasClass(content, "hide")) {
                _removeClass(content, "hide");
                _addClass(content, "show");
            }
        };
        var _addClass = function(el, className) {
            if (el.classList)
                el.classList.add(className);
            else
                el.className += ' ' + className;
        };

        var _removeClass = function(el, className) {
            if (el.classList)
                el.classList.remove(className);
            else
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        };

        var _hasClass = function(el, className) {
            if (el.classList)
                return el.classList.contains(className);
            else
                return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        };

        var closestByClass = function(element, className) {
            while (element.className != className) {
                element = element.parentNode;
                if (!element) {
                    return null;
                }
            }
            return element;
        }
    })(TopDestinations);
    if (hotelLists) {
        TopDestinations.init();
    }
});