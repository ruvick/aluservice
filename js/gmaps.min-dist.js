"use strict";

!function(e, t) {
    "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define([ "jquery", "googlemaps!" ], t) : e.GMaps = t();
}(this, function() {
    var T, z, t, o, S = function(e, t) {
        var o;
        if (e === t) return e;
        for (o in t) void 0 !== t[o] && (e[o] = t[o]);
        return e;
    }, i = function(e, o) {
        var t, n = Array.prototype.slice.call(arguments, 2), r = [], i = e.length;
        if (Array.prototype.map && e.map === Array.prototype.map) r = Array.prototype.map.call(e, function(e) {
            var t = n.slice(0);
            return t.splice(0, 0, e), o.apply(this, t);
        }); else for (t = 0; t < i; t++) callback_params = n, callback_params.splice(0, 0, e[t]), 
        r.push(o.apply(this, callback_params));
        return r;
    }, s = function(e) {
        var t, o = [];
        for (t = 0; t < e.length; t++) o = o.concat(e[t]);
        return o;
    }, a = function(e, t) {
        var o, n, r, i, s;
        for (o = 0; o < e.length; o++) e[o] instanceof google.maps.LatLng || (0 < e[o].length && "object" == typeof e[o][0] ? e[o] = a(e[o], t) : e[o] = (n = e[o], 
        r = t, s = i = void 0, i = n[0], s = n[1], r && (i = n[1], s = n[0]), new google.maps.LatLng(i, s)));
        return e;
    }, W = function(e, t) {
        e = e.replace("#", "");
        return "jQuery" in window && t ? $("#" + e, t)[0] : document.getElementById(e);
    }, p = (T = document, z = function(o) {
        if ("object" != typeof window.google || !window.google.maps) return "object" == typeof window.console && window.console.error && console.error("Google Maps API is required. Please register the following JavaScript library https://maps.googleapis.com/maps/api/js."), 
        function() {};
        if (!this) return new z(o);
        o.zoom = o.zoom || 15, o.mapType = o.mapType || "roadmap";
        var e, t = function(e, t) {
            return void 0 === e ? t : e;
        }, u = this, n = [ "bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "idle", "maptypeid_changed", "projection_changed", "resize", "tilesloaded", "zoom_changed" ], r = [ "mousemove", "mouseout", "mouseover" ], i = [ "el", "lat", "lng", "mapType", "width", "height", "markerClusterer", "enableNewStyle" ], s = o.el || o.div, a = o.markerClusterer, l = google.maps.MapTypeId[o.mapType.toUpperCase()], p = new google.maps.LatLng(o.lat, o.lng), c = t(o.zoomControl, !0), g = o.zoomControlOpt || {
            style: "DEFAULT",
            position: "TOP_LEFT"
        }, h = g.style || "DEFAULT", d = g.position || "TOP_LEFT", m = t(o.panControl, !0), f = t(o.mapTypeControl, !0), y = t(o.scaleControl, !0), v = t(o.streetViewControl, !0), k = t(k, !0), w = {}, L = {
            zoom: this.zoom,
            center: p,
            mapTypeId: l
        }, b = {
            panControl: m,
            zoomControl: c,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle[h],
                position: google.maps.ControlPosition[d]
            },
            mapTypeControl: f,
            scaleControl: y,
            streetViewControl: v,
            overviewMapControl: k
        };
        if ("string" == typeof o.el || "string" == typeof o.div ? -1 < s.indexOf("#") ? this.el = W(s, o.context) : this.el = function(e, t) {
            var o = e.replace(".", "");
            return "jQuery" in this && t ? $("." + o, t)[0] : document.getElementsByClassName(o)[0];
        }.apply(this, [ s, o.context ]) : this.el = s, void 0 === this.el || null === this.el) throw "No element defined.";
        for (window.context_menu = window.context_menu || {}, window.context_menu[u.el.id] = {}, 
        this.controls = [], this.overlays = [], this.layers = [], this.singleLayers = {}, 
        this.markers = [], this.polylines = [], this.routes = [], this.polygons = [], this.infoWindow = null, 
        this.overlay_el = null, this.zoom = o.zoom, this.registered_events = {}, this.el.style.width = o.width || this.el.scrollWidth || this.el.offsetWidth, 
        this.el.style.height = o.height || this.el.scrollHeight || this.el.offsetHeight, 
        google.maps.visualRefresh = o.enableNewStyle, e = 0; e < i.length; e++) delete o[i[e]];
        for (1 != o.disableDefaultUI && (L = S(L, b)), w = S(L, o), e = 0; e < n.length; e++) delete w[n[e]];
        for (e = 0; e < r.length; e++) delete w[r[e]];
        this.map = new google.maps.Map(this.el, w), a && (this.markerClusterer = a.apply(this, [ this.map ]));
        var _ = function(t, o) {
            var e = "", n = window.context_menu[u.el.id][t];
            for (var r in n) if (n.hasOwnProperty(r)) {
                var i = n[r];
                e += '<li><a id="' + t + "_" + r + '" href="#">' + i.title + "</a></li>";
            }
            if (W("gmaps_context_menu")) {
                var s = W("gmaps_context_menu");
                s.innerHTML = e;
                var a = s.getElementsByTagName("a"), l = a.length;
                for (r = 0; r < l; r++) {
                    var p = a[r];
                    google.maps.event.clearListeners(p, "click"), google.maps.event.addDomListenerOnce(p, "click", function(e) {
                        e.preventDefault(), n[this.id.replace(t + "_", "")].action.apply(u, [ o ]), u.hideContextMenu();
                    }, !1);
                }
                var c = function(e) {
                    var t = 0, o = 0;
                    if (e.offsetParent) for (;t += e.offsetLeft, o += e.offsetTop, e = e.offsetParent; ) ;
                    return [ t, o ];
                }.apply(this, [ u.el ]), g = c[0] + o.pixel.x - 15, h = c[1] + o.pixel.y - 15;
                s.style.left = g + "px", s.style.top = h + "px";
            }
        };
        this.buildContextMenu = function(o, n) {
            if ("marker" === o) {
                n.pixel = {};
                var r = new google.maps.OverlayView();
                r.setMap(u.map), r.draw = function() {
                    var e = r.getProjection(), t = n.marker.getPosition();
                    n.pixel = e.fromLatLngToContainerPixel(t), _(o, n);
                };
            } else _(o, n);
            var e = W("gmaps_context_menu");
            setTimeout(function() {
                e.style.display = "block";
            }, 0);
        }, this.setContextMenu = function(e) {
            window.context_menu[u.el.id][e.control] = {};
            var t, o = T.createElement("ul");
            for (t in e.options) if (e.options.hasOwnProperty(t)) {
                var n = e.options[t];
                window.context_menu[u.el.id][e.control][n.name] = {
                    title: n.title,
                    action: n.action
                };
            }
            o.id = "gmaps_context_menu", o.style.display = "none", o.style.position = "absolute", 
            o.style.minWidth = "100px", o.style.background = "white", o.style.listStyle = "none", 
            o.style.padding = "8px", o.style.boxShadow = "2px 2px 6px #ccc", W("gmaps_context_menu") || T.body.appendChild(o);
            var r = W("gmaps_context_menu");
            google.maps.event.addDomListener(r, "mouseout", function(e) {
                e.relatedTarget && this.contains(e.relatedTarget) || window.setTimeout(function() {
                    r.style.display = "none";
                }, 400);
            }, !1);
        }, this.hideContextMenu = function() {
            var e = W("gmaps_context_menu");
            e && (e.style.display = "none");
        };
        var M = function(e, t) {
            google.maps.event.addListener(e, t, function(e) {
                null == e && (e = this), o[t].apply(this, [ e ]), u.hideContextMenu();
            });
        };
        google.maps.event.addListener(this.map, "zoom_changed", this.hideContextMenu);
        for (var x = 0; x < n.length; x++) {
            (C = n[x]) in o && M(this.map, C);
        }
        for (x = 0; x < r.length; x++) {
            var C;
            (C = r[x]) in o && M(this.map, C);
        }
        google.maps.event.addListener(this.map, "rightclick", function(e) {
            o.rightclick && o.rightclick.apply(this, [ e ]), null != window.context_menu[u.el.id].map && u.buildContextMenu("map", e);
        }), this.refresh = function() {
            google.maps.event.trigger(this.map, "resize");
        }, this.fitZoom = function() {
            var e, t = [], o = this.markers.length;
            for (e = 0; e < o; e++) "boolean" == typeof this.markers[e].visible && this.markers[e].visible && t.push(this.markers[e].getPosition());
            this.fitLatLngBounds(t);
        }, this.fitLatLngBounds = function(e) {
            var t, o = e.length, n = new google.maps.LatLngBounds();
            for (t = 0; t < o; t++) n.extend(e[t]);
            this.map.fitBounds(n);
        }, this.setCenter = function(e, t, o) {
            this.map.panTo(new google.maps.LatLng(e, t)), o && o();
        }, this.getElement = function() {
            return this.el;
        }, this.zoomIn = function(e) {
            e = e || 1, this.zoom = this.map.getZoom() + e, this.map.setZoom(this.zoom);
        }, this.zoomOut = function(e) {
            e = e || 1, this.zoom = this.map.getZoom() - e, this.map.setZoom(this.zoom);
        };
        var O, P = [];
        for (O in this.map) "function" != typeof this.map[O] || this[O] || P.push(O);
        for (e = 0; e < P.length; e++) !function(e, t, o) {
            e[o] = function() {
                return t[o].apply(t, arguments);
            };
        }(this, this.map, P[e]);
    });
    return p.prototype.createControl = function(o) {
        var e = document.createElement("div");
        for (var t in e.style.cursor = "pointer", !0 !== o.disableDefaultStyles && (e.style.fontFamily = "Roboto, Arial, sans-serif", 
        e.style.fontSize = "11px", e.style.boxShadow = "rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px"), 
        o.style) e.style[t] = o.style[t];
        for (var n in o.id && (e.id = o.id), o.title && (e.title = o.title), o.classes && (e.className = o.classes), 
        o.content && ("string" == typeof o.content ? e.innerHTML = o.content : o.content instanceof HTMLElement && e.appendChild(o.content)), 
        o.position && (e.position = google.maps.ControlPosition[o.position.toUpperCase()]), 
        o.events) !function(e, t) {
            google.maps.event.addDomListener(e, t, function() {
                o.events[t].apply(this, [ this ]);
            });
        }(e, n);
        return e.index = 1, e;
    }, p.prototype.addControl = function(e) {
        var t = this.createControl(e);
        return this.controls.push(t), this.map.controls[t.position].push(t), t;
    }, p.prototype.removeControl = function(e) {
        var t, o = null;
        for (t = 0; t < this.controls.length; t++) this.controls[t] == e && (o = this.controls[t].position, 
        this.controls.splice(t, 1));
        if (o) for (t = 0; t < this.map.controls.length; t++) {
            var n = this.map.controls[e.position];
            if (n.getAt(t) == e) {
                n.removeAt(t);
                break;
            }
        }
        return e;
    }, p.prototype.createMarker = function(n) {
        if (null == n.lat && null == n.lng && null == n.position) throw "No latitude or longitude defined.";
        var t = this, e = n.details, o = n.fences, r = n.outside, i = {
            position: new google.maps.LatLng(n.lat, n.lng),
            map: null
        }, s = S(i, n);
        delete s.lat, delete s.lng, delete s.fences, delete s.outside;
        var a = new google.maps.Marker(s);
        if (a.fences = o, n.infoWindow) {
            a.infoWindow = new google.maps.InfoWindow(n.infoWindow);
            for (var l = [ "closeclick", "content_changed", "domready", "position_changed", "zindex_changed" ], p = 0; p < l.length; p++) !function(e, t) {
                n.infoWindow[t] && google.maps.event.addListener(e, t, function(e) {
                    n.infoWindow[t].apply(this, [ e ]);
                });
            }(a.infoWindow, l[p]);
        }
        var c = [ "animation_changed", "clickable_changed", "cursor_changed", "draggable_changed", "flat_changed", "icon_changed", "position_changed", "shadow_changed", "shape_changed", "title_changed", "visible_changed", "zindex_changed" ], g = [ "dblclick", "drag", "dragend", "dragstart", "mousedown", "mouseout", "mouseover", "mouseup" ];
        for (p = 0; p < c.length; p++) !function(e, t) {
            n[t] && google.maps.event.addListener(e, t, function() {
                n[t].apply(this, [ this ]);
            });
        }(a, c[p]);
        for (p = 0; p < g.length; p++) !function(t, e, o) {
            n[o] && google.maps.event.addListener(e, o, function(e) {
                e.pixel || (e.pixel = t.getProjection().fromLatLngToPoint(e.latLng)), n[o].apply(this, [ e ]);
            });
        }(this.map, a, g[p]);
        return google.maps.event.addListener(a, "click", function() {
            this.details = e, n.click && n.click.apply(this, [ this ]), a.infoWindow && (t.hideInfoWindows(), 
            a.infoWindow.open(t.map, a));
        }), google.maps.event.addListener(a, "rightclick", function(e) {
            e.marker = this, n.rightclick && n.rightclick.apply(this, [ e ]), null != window.context_menu[t.el.id].marker && t.buildContextMenu("marker", e);
        }), a.fences && google.maps.event.addListener(a, "dragend", function() {
            t.checkMarkerGeofence(a, function(e, t) {
                r(e, t);
            });
        }), a;
    }, p.prototype.addMarker = function(e) {
        var t;
        if (e.hasOwnProperty("gm_accessors_")) t = e; else {
            if (!(e.hasOwnProperty("lat") && e.hasOwnProperty("lng") || e.position)) throw "No latitude or longitude defined.";
            t = this.createMarker(e);
        }
        return t.setMap(this.map), this.markerClusterer && this.markerClusterer.addMarker(t), 
        this.markers.push(t), p.fire("marker_added", t, this), t;
    }, p.prototype.addMarkers = function(e) {
        for (var t, o = 0; t = e[o]; o++) this.addMarker(t);
        return this.markers;
    }, p.prototype.hideInfoWindows = function() {
        for (var e, t = 0; e = this.markers[t]; t++) e.infoWindow && e.infoWindow.close();
    }, p.prototype.removeMarker = function(e) {
        for (var t = 0; t < this.markers.length; t++) if (this.markers[t] === e) {
            this.markers[t].setMap(null), this.markers.splice(t, 1), this.markerClusterer && this.markerClusterer.removeMarker(e), 
            p.fire("marker_removed", e, this);
            break;
        }
        return e;
    }, p.prototype.removeMarkers = function(e) {
        var t = [];
        if (void 0 === e) {
            for (var o = 0; o < this.markers.length; o++) {
                (r = this.markers[o]).setMap(null), p.fire("marker_removed", r, this);
            }
            this.markerClusterer && this.markerClusterer.clearMarkers && this.markerClusterer.clearMarkers(), 
            this.markers = t;
        } else {
            for (o = 0; o < e.length; o++) {
                var n = this.markers.indexOf(e[o]);
                if (-1 < n) (r = this.markers[n]).setMap(null), this.markerClusterer && this.markerClusterer.removeMarker(r), 
                p.fire("marker_removed", r, this);
            }
            for (o = 0; o < this.markers.length; o++) {
                var r;
                null != (r = this.markers[o]).getMap() && t.push(r);
            }
            this.markers = t;
        }
    }, p.prototype.drawOverlay = function(s) {
        var a = new google.maps.OverlayView(), i = !0;
        return a.setMap(this.map), null != s.auto_show && (i = s.auto_show), a.onAdd = function() {
            var e = document.createElement("div");
            e.style.borderStyle = "none", e.style.borderWidth = "0px", e.style.position = "absolute", 
            e.style.zIndex = 100, e.innerHTML = s.content, a.el = e, s.layer || (s.layer = "overlayLayer");
            var t, o, n = this.getPanes(), r = [ "contextmenu", "DOMMouseScroll", "dblclick", "mousedown" ];
            n[s.layer].appendChild(e);
            for (var i = 0; i < r.length; i++) t = e, o = r[i], google.maps.event.addDomListener(t, o, function(e) {
                -1 != navigator.userAgent.toLowerCase().indexOf("msie") && document.all ? (e.cancelBubble = !0, 
                e.returnValue = !1) : e.stopPropagation();
            });
            s.click && (n.overlayMouseTarget.appendChild(a.el), google.maps.event.addDomListener(a.el, "click", function() {
                s.click.apply(a, [ a ]);
            })), google.maps.event.trigger(this, "ready");
        }, a.draw = function() {
            var e = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(s.lat, s.lng));
            s.horizontalOffset = s.horizontalOffset || 0, s.verticalOffset = s.verticalOffset || 0;
            var t = a.el, o = t.children[0], n = o.clientHeight, r = o.clientWidth;
            switch (s.verticalAlign) {
              case "top":
                t.style.top = e.y - n + s.verticalOffset + "px";
                break;

              default:
              case "middle":
                t.style.top = e.y - n / 2 + s.verticalOffset + "px";
                break;

              case "bottom":
                t.style.top = e.y + s.verticalOffset + "px";
            }
            switch (s.horizontalAlign) {
              case "left":
                t.style.left = e.x - r + s.horizontalOffset + "px";
                break;

              default:
              case "center":
                t.style.left = e.x - r / 2 + s.horizontalOffset + "px";
                break;

              case "right":
                t.style.left = e.x + s.horizontalOffset + "px";
            }
            t.style.display = i ? "block" : "none", i || s.show.apply(this, [ t ]);
        }, a.onRemove = function() {
            var e = a.el;
            s.remove ? s.remove.apply(this, [ e ]) : (a.el.parentNode.removeChild(a.el), a.el = null);
        }, this.overlays.push(a), a;
    }, p.prototype.removeOverlay = function(e) {
        for (var t = 0; t < this.overlays.length; t++) if (this.overlays[t] === e) {
            this.overlays[t].setMap(null), this.overlays.splice(t, 1);
            break;
        }
    }, p.prototype.removeOverlays = function() {
        for (var e, t = 0; e = this.overlays[t]; t++) e.setMap(null);
        this.overlays = [];
    }, p.prototype.drawPolyline = function(o) {
        var e = [], t = o.path;
        if (t.length) if (void 0 === t[0][0]) e = t; else for (var n, r = 0; n = t[r]; r++) e.push(new google.maps.LatLng(n[0], n[1]));
        var i = {
            map: this.map,
            path: e,
            strokeColor: o.strokeColor,
            strokeOpacity: o.strokeOpacity,
            strokeWeight: o.strokeWeight,
            geodesic: o.geodesic,
            clickable: !0,
            editable: !1,
            visible: !0
        };
        o.hasOwnProperty("clickable") && (i.clickable = o.clickable), o.hasOwnProperty("editable") && (i.editable = o.editable), 
        o.hasOwnProperty("icons") && (i.icons = o.icons), o.hasOwnProperty("zIndex") && (i.zIndex = o.zIndex);
        for (var s = new google.maps.Polyline(i), a = [ "click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick" ], l = 0; l < a.length; l++) !function(e, t) {
            o[t] && google.maps.event.addListener(e, t, function(e) {
                o[t].apply(this, [ e ]);
            });
        }(s, a[l]);
        return this.polylines.push(s), p.fire("polyline_added", s, this), s;
    }, p.prototype.removePolyline = function(e) {
        for (var t = 0; t < this.polylines.length; t++) if (this.polylines[t] === e) {
            this.polylines[t].setMap(null), this.polylines.splice(t, 1), p.fire("polyline_removed", e, this);
            break;
        }
    }, p.prototype.removePolylines = function() {
        for (var e, t = 0; e = this.polylines[t]; t++) e.setMap(null);
        this.polylines = [];
    }, p.prototype.drawCircle = function(o) {
        delete (o = S({
            map: this.map,
            center: new google.maps.LatLng(o.lat, o.lng)
        }, o)).lat, delete o.lng;
        for (var e = new google.maps.Circle(o), t = [ "click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick" ], n = 0; n < t.length; n++) !function(e, t) {
            o[t] && google.maps.event.addListener(e, t, function(e) {
                o[t].apply(this, [ e ]);
            });
        }(e, t[n]);
        return this.polygons.push(e), e;
    }, p.prototype.drawRectangle = function(o) {
        o = S({
            map: this.map
        }, o);
        var e = new google.maps.LatLngBounds(new google.maps.LatLng(o.bounds[0][0], o.bounds[0][1]), new google.maps.LatLng(o.bounds[1][0], o.bounds[1][1]));
        o.bounds = e;
        for (var t = new google.maps.Rectangle(o), n = [ "click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick" ], r = 0; r < n.length; r++) !function(e, t) {
            o[t] && google.maps.event.addListener(e, t, function(e) {
                o[t].apply(this, [ e ]);
            });
        }(t, n[r]);
        return this.polygons.push(t), t;
    }, p.prototype.drawPolygon = function(o) {
        var e = !1;
        o.hasOwnProperty("useGeoJSON") && (e = o.useGeoJSON), delete o.useGeoJSON, o = S({
            map: this.map
        }, o), 0 == e && (o.paths = [ o.paths.slice(0) ]), 0 < o.paths.length && 0 < o.paths[0].length && (o.paths = s(i(o.paths, a, e)));
        for (var t = new google.maps.Polygon(o), n = [ "click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick" ], r = 0; r < n.length; r++) !function(e, t) {
            o[t] && google.maps.event.addListener(e, t, function(e) {
                o[t].apply(this, [ e ]);
            });
        }(t, n[r]);
        return this.polygons.push(t), p.fire("polygon_added", t, this), t;
    }, p.prototype.removePolygon = function(e) {
        for (var t = 0; t < this.polygons.length; t++) if (this.polygons[t] === e) {
            this.polygons[t].setMap(null), this.polygons.splice(t, 1), p.fire("polygon_removed", e, this);
            break;
        }
    }, p.prototype.removePolygons = function() {
        for (var e, t = 0; e = this.polygons[t]; t++) e.setMap(null);
        this.polygons = [];
    }, p.prototype.getFromFusionTables = function(e) {
        var o = e.events;
        delete e.events;
        var t = e, n = new google.maps.FusionTablesLayer(t);
        for (var r in o) !function(e, t) {
            google.maps.event.addListener(e, t, function(e) {
                o[t].apply(this, [ e ]);
            });
        }(n, r);
        return this.layers.push(n), n;
    }, p.prototype.loadFromFusionTables = function(e) {
        var t = this.getFromFusionTables(e);
        return t.setMap(this.map), t;
    }, p.prototype.getFromKML = function(e) {
        var t = e.url, o = e.events;
        delete e.url, delete e.events;
        var n = e, r = new google.maps.KmlLayer(t, n);
        for (var i in o) !function(e, t) {
            google.maps.event.addListener(e, t, function(e) {
                o[t].apply(this, [ e ]);
            });
        }(r, i);
        return this.layers.push(r), r;
    }, p.prototype.loadFromKML = function(e) {
        var t = this.getFromKML(e);
        return t.setMap(this.map), t;
    }, p.prototype.addLayer = function(e, t) {
        var o;
        switch (t = t || {}, e) {
          case "weather":
            this.singleLayers.weather = o = new google.maps.weather.WeatherLayer();
            break;

          case "clouds":
            this.singleLayers.clouds = o = new google.maps.weather.CloudLayer();
            break;

          case "traffic":
            this.singleLayers.traffic = o = new google.maps.TrafficLayer();
            break;

          case "transit":
            this.singleLayers.transit = o = new google.maps.TransitLayer();
            break;

          case "bicycling":
            this.singleLayers.bicycling = o = new google.maps.BicyclingLayer();
            break;

          case "panoramio":
            this.singleLayers.panoramio = o = new google.maps.panoramio.PanoramioLayer(), o.setTag(t.filter), 
            delete t.filter, t.click && google.maps.event.addListener(o, "click", function(e) {
                t.click(e), delete t.click;
            });
            break;

          case "places":
            if (this.singleLayers.places = o = new google.maps.places.PlacesService(this.map), 
            t.search || t.nearbySearch || t.radarSearch) {
                var n = {
                    bounds: t.bounds || null,
                    keyword: t.keyword || null,
                    location: t.location || null,
                    name: t.name || null,
                    radius: t.radius || null,
                    rankBy: t.rankBy || null,
                    types: t.types || null
                };
                t.radarSearch && o.radarSearch(n, t.radarSearch), t.search && o.search(n, t.search), 
                t.nearbySearch && o.nearbySearch(n, t.nearbySearch);
            }
            if (t.textSearch) {
                var r = {
                    bounds: t.bounds || null,
                    location: t.location || null,
                    query: t.query || null,
                    radius: t.radius || null
                };
                o.textSearch(r, t.textSearch);
            }
        }
        return void 0 !== o ? ("function" == typeof o.setOptions && o.setOptions(t), "function" == typeof o.setMap && o.setMap(this.map), 
        o) : void 0;
    }, p.prototype.removeLayer = function(e) {
        if ("string" == typeof e && void 0 !== this.singleLayers[e]) this.singleLayers[e].setMap(null), 
        delete this.singleLayers[e]; else for (var t = 0; t < this.layers.length; t++) if (this.layers[t] === e) {
            this.layers[t].setMap(null), this.layers.splice(t, 1);
            break;
        }
    }, p.prototype.getRoutes = function(n) {
        switch (n.travelMode) {
          case "bicycling":
            t = google.maps.TravelMode.BICYCLING;
            break;

          case "transit":
            t = google.maps.TravelMode.TRANSIT;
            break;

          case "driving":
            t = google.maps.TravelMode.DRIVING;
            break;

          default:
            t = google.maps.TravelMode.WALKING;
        }
        o = "imperial" === n.unitSystem ? google.maps.UnitSystem.IMPERIAL : google.maps.UnitSystem.METRIC;
        var e = S({
            avoidHighways: !1,
            avoidTolls: !1,
            optimizeWaypoints: !1,
            waypoints: []
        }, n);
        e.origin = /string/.test(typeof n.origin) ? n.origin : new google.maps.LatLng(n.origin[0], n.origin[1]), 
        e.destination = /string/.test(typeof n.destination) ? n.destination : new google.maps.LatLng(n.destination[0], n.destination[1]), 
        e.travelMode = t, e.unitSystem = o, delete e.callback, delete e.error;
        var r = [];
        new google.maps.DirectionsService().route(e, function(e, t) {
            if (t === google.maps.DirectionsStatus.OK) {
                for (var o in e.routes) e.routes.hasOwnProperty(o) && r.push(e.routes[o]);
                n.callback && n.callback(r, e, t);
            } else n.error && n.error(e, t);
        });
    }, p.prototype.removeRoutes = function() {
        this.routes.length = 0;
    }, p.prototype.getElevations = function(e) {
        0 < (e = S({
            locations: [],
            path: !1,
            samples: 256
        }, e)).locations.length && 0 < e.locations[0].length && (e.locations = s(i([ e.locations ], a, !1)));
        var o = e.callback;
        delete e.callback;
        var t = new google.maps.ElevationService();
        if (e.path) {
            var n = {
                path: e.locations,
                samples: e.samples
            };
            t.getElevationAlongPath(n, function(e, t) {
                o && "function" == typeof o && o(e, t);
            });
        } else delete e.path, delete e.samples, t.getElevationForLocations(e, function(e, t) {
            o && "function" == typeof o && o(e, t);
        });
    }, p.prototype.cleanRoute = p.prototype.removePolylines, p.prototype.renderRoute = function(e, t) {
        var n, o = "string" == typeof t.panel ? document.getElementById(t.panel.replace("#", "")) : t.panel;
        t.panel = o, t = S({
            map: this.map
        }, t), n = new google.maps.DirectionsRenderer(t), this.getRoutes({
            origin: e.origin,
            destination: e.destination,
            travelMode: e.travelMode,
            waypoints: e.waypoints,
            unitSystem: e.unitSystem,
            error: e.error,
            avoidHighways: e.avoidHighways,
            avoidTolls: e.avoidTolls,
            optimizeWaypoints: e.optimizeWaypoints,
            callback: function(e, t, o) {
                o === google.maps.DirectionsStatus.OK && n.setDirections(t);
            }
        });
    }, p.prototype.drawRoute = function(o) {
        var n = this;
        this.getRoutes({
            origin: o.origin,
            destination: o.destination,
            travelMode: o.travelMode,
            waypoints: o.waypoints,
            unitSystem: o.unitSystem,
            error: o.error,
            avoidHighways: o.avoidHighways,
            avoidTolls: o.avoidTolls,
            optimizeWaypoints: o.optimizeWaypoints,
            callback: function(e) {
                if (0 < e.length) {
                    var t = {
                        path: e[e.length - 1].overview_path,
                        strokeColor: o.strokeColor,
                        strokeOpacity: o.strokeOpacity,
                        strokeWeight: o.strokeWeight
                    };
                    o.hasOwnProperty("icons") && (t.icons = o.icons), n.drawPolyline(t), o.callback && o.callback(e[e.length - 1]);
                }
            }
        });
    }, p.prototype.travelRoute = function(i) {
        if (i.origin && i.destination) this.getRoutes({
            origin: i.origin,
            destination: i.destination,
            travelMode: i.travelMode,
            waypoints: i.waypoints,
            unitSystem: i.unitSystem,
            error: i.error,
            callback: function(e) {
                if (0 < e.length && i.start && i.start(e[e.length - 1]), 0 < e.length && i.step) {
                    var t = e[e.length - 1];
                    if (0 < t.legs.length) for (var o, n = t.legs[0].steps, r = 0; o = n[r]; r++) o.step_number = r, 
                    i.step(o, t.legs[0].steps.length - 1);
                }
                0 < e.length && i.end && i.end(e[e.length - 1]);
            }
        }); else if (i.route && 0 < i.route.legs.length) for (var e, t = i.route.legs[0].steps, o = 0; e = t[o]; o++) e.step_number = o, 
        i.step(e);
    }, p.prototype.drawSteppedRoute = function(s) {
        var a = this;
        if (s.origin && s.destination) this.getRoutes({
            origin: s.origin,
            destination: s.destination,
            travelMode: s.travelMode,
            waypoints: s.waypoints,
            error: s.error,
            callback: function(e) {
                if (0 < e.length && s.start && s.start(e[e.length - 1]), 0 < e.length && s.step) {
                    var t = e[e.length - 1];
                    if (0 < t.legs.length) for (var o, n = t.legs[0].steps, r = 0; o = n[r]; r++) {
                        o.step_number = r;
                        var i = {
                            path: o.path,
                            strokeColor: s.strokeColor,
                            strokeOpacity: s.strokeOpacity,
                            strokeWeight: s.strokeWeight
                        };
                        s.hasOwnProperty("icons") && (i.icons = s.icons), a.drawPolyline(i), s.step(o, t.legs[0].steps.length - 1);
                    }
                }
                0 < e.length && s.end && s.end(e[e.length - 1]);
            }
        }); else if (s.route && 0 < s.route.legs.length) for (var e, t = s.route.legs[0].steps, o = 0; e = t[o]; o++) {
            e.step_number = o;
            var n = {
                path: e.path,
                strokeColor: s.strokeColor,
                strokeOpacity: s.strokeOpacity,
                strokeWeight: s.strokeWeight
            };
            s.hasOwnProperty("icons") && (n.icons = s.icons), a.drawPolyline(n), s.step(e);
        }
    }, p.Route = function(e) {
        this.origin = e.origin, this.destination = e.destination, this.waypoints = e.waypoints, 
        this.map = e.map, this.route = e.route, this.step_count = 0, this.steps = this.route.legs[0].steps, 
        this.steps_length = this.steps.length;
        var t = {
            path: new google.maps.MVCArray(),
            strokeColor: e.strokeColor,
            strokeOpacity: e.strokeOpacity,
            strokeWeight: e.strokeWeight
        };
        e.hasOwnProperty("icons") && (t.icons = e.icons), this.polyline = this.map.drawPolyline(t).getPath();
    }, p.Route.prototype.getRoute = function(t) {
        var o = this;
        this.map.getRoutes({
            origin: this.origin,
            destination: this.destination,
            travelMode: t.travelMode,
            waypoints: this.waypoints || [],
            error: t.error,
            callback: function() {
                o.route = e[0], t.callback && t.callback.call(o);
            }
        });
    }, p.Route.prototype.back = function() {
        if (0 < this.step_count) {
            this.step_count--;
            var e = this.route.legs[0].steps[this.step_count].path;
            for (var t in e) e.hasOwnProperty(t) && this.polyline.pop();
        }
    }, p.Route.prototype.forward = function() {
        if (this.step_count < this.steps_length) {
            var e = this.route.legs[0].steps[this.step_count].path;
            for (var t in e) e.hasOwnProperty(t) && this.polyline.push(e[t]);
            this.step_count++;
        }
    }, p.prototype.checkGeofence = function(e, t, o) {
        return o.containsLatLng(new google.maps.LatLng(e, t));
    }, p.prototype.checkMarkerGeofence = function(e, t) {
        if (e.fences) for (var o, n = 0; o = e.fences[n]; n++) {
            var r = e.getPosition();
            this.checkGeofence(r.lat(), r.lng(), o) || t(e, o);
        }
    }, p.prototype.toImage = function(e) {
        e = e || {};
        var t = {};
        if (t.size = e.size || [ this.el.clientWidth, this.el.clientHeight ], t.lat = this.getCenter().lat(), 
        t.lng = this.getCenter().lng(), 0 < this.markers.length) {
            t.markers = [];
            for (var o = 0; o < this.markers.length; o++) t.markers.push({
                lat: this.markers[o].getPosition().lat(),
                lng: this.markers[o].getPosition().lng()
            });
        }
        if (0 < this.polylines.length) {
            var n = this.polylines[0];
            t.polyline = {}, t.polyline.path = google.maps.geometry.encoding.encodePath(n.getPath()), 
            t.polyline.strokeColor = n.strokeColor, t.polyline.strokeOpacity = n.strokeOpacity, 
            t.polyline.strokeWeight = n.strokeWeight;
        }
        return p.staticMapURL(t);
    }, p.staticMapURL = function(e) {
        function t(e, t) {
            if ("#" === e[0] && (e = e.replace("#", "0x"), t)) {
                if (t = parseFloat(t), 0 === (t = Math.min(1, Math.max(t, 0)))) return "0x00000000";
                1 === (t = (255 * t).toString(16)).length && (t += t), e = e.slice(0, 8) + t;
            }
            return e;
        }
        var o, n = [], r = ("file:" === location.protocol ? "http:" : location.protocol) + "//maps.googleapis.com/maps/api/staticmap";
        e.url && (r = e.url, delete e.url), r += "?";
        var i = e.markers;
        delete e.markers, !i && e.marker && (i = [ e.marker ], delete e.marker);
        var s = e.styles;
        delete e.styles;
        var a = e.polyline;
        if (delete e.polyline, e.center) n.push("center=" + e.center), delete e.center; else if (e.address) n.push("center=" + e.address), 
        delete e.address; else if (e.lat) n.push([ "center=", e.lat, ",", e.lng ].join("")), 
        delete e.lat, delete e.lng; else if (e.visible) {
            var l = encodeURI(e.visible.join("|"));
            n.push("visible=" + l);
        }
        var p = e.size;
        p ? (p.join && (p = p.join("x")), delete e.size) : p = "630x300", n.push("size=" + p), 
        e.zoom || !1 === e.zoom || (e.zoom = 15);
        var c = !e.hasOwnProperty("sensor") || !!e.sensor;
        for (var g in delete e.sensor, n.push("sensor=" + c), e) e.hasOwnProperty(g) && n.push(g + "=" + e[g]);
        if (i) for (var h, u, d = 0; o = i[d]; d++) {
            for (var g in h = [], o.size && "normal" !== o.size ? (h.push("size:" + o.size), 
            delete o.size) : o.icon && (h.push("icon:" + encodeURI(o.icon)), delete o.icon), 
            o.color && (h.push("color:" + o.color.replace("#", "0x")), delete o.color), o.label && (h.push("label:" + o.label[0].toUpperCase()), 
            delete o.label), u = o.address ? o.address : o.lat + "," + o.lng, delete o.address, 
            delete o.lat, delete o.lng, o) o.hasOwnProperty(g) && h.push(g + ":" + o[g]);
            h.length || 0 === d ? (h.push(u), h = h.join("|"), n.push("markers=" + encodeURI(h))) : (h = n.pop() + encodeURI("|" + u), 
            n.push(h));
        }
        if (s) for (d = 0; d < s.length; d++) {
            var m = [];
            s[d].featureType && m.push("feature:" + s[d].featureType.toLowerCase()), s[d].elementType && m.push("element:" + s[d].elementType.toLowerCase());
            for (var f = 0; f < s[d].stylers.length; f++) for (var y in s[d].stylers[f]) {
                var v = s[d].stylers[f][y];
                ("hue" == y || "color" == y) && (v = "0x" + v.substring(1)), m.push(y + ":" + v);
            }
            var k = m.join("|");
            "" != k && n.push("style=" + k);
        }
        if (a) {
            if (o = a, a = [], o.strokeWeight && a.push("weight:" + parseInt(o.strokeWeight, 10)), 
            o.strokeColor) {
                var w = t(o.strokeColor, o.strokeOpacity);
                a.push("color:" + w);
            }
            if (o.fillColor) {
                var L = t(o.fillColor, o.fillOpacity);
                a.push("fillcolor:" + L);
            }
            var b = o.path;
            if (b.join) {
                var _;
                for (f = 0; _ = b[f]; f++) a.push(_.join(","));
            } else a.push("enc:" + b);
            a = a.join("|"), n.push("path=" + encodeURI(a));
        }
        var M = window.devicePixelRatio || 1;
        return n.push("scale=" + M), r + (n = n.join("&"));
    }, p.prototype.addMapType = function(e, t) {
        if (!t.hasOwnProperty("getTileUrl") || "function" != typeof t.getTileUrl) throw "'getTileUrl' function required.";
        t.tileSize = t.tileSize || new google.maps.Size(256, 256);
        var o = new google.maps.ImageMapType(t);
        this.map.mapTypes.set(e, o);
    }, p.prototype.addOverlayMapType = function(e) {
        if (!e.hasOwnProperty("getTile") || "function" != typeof e.getTile) throw "'getTile' function required.";
        var t = e.index;
        delete e.index, this.map.overlayMapTypes.insertAt(t, e);
    }, p.prototype.removeOverlayMapType = function(e) {
        this.map.overlayMapTypes.removeAt(e);
    }, p.prototype.addStyle = function(e) {
        var t = new google.maps.StyledMapType(e.styles, {
            name: e.styledMapName
        });
        this.map.mapTypes.set(e.mapTypeId, t);
    }, p.prototype.setStyle = function(e) {
        this.map.setMapTypeId(e);
    }, p.prototype.createPanorama = function(e) {
        return e.hasOwnProperty("lat") && e.hasOwnProperty("lng") || (e.lat = this.getCenter().lat(), 
        e.lng = this.getCenter().lng()), this.panorama = p.createPanorama(e), this.map.setStreetView(this.panorama), 
        this.panorama;
    }, p.createPanorama = function(o) {
        var e = W(o.el, o.context);
        o.position = new google.maps.LatLng(o.lat, o.lng), delete o.el, delete o.context, 
        delete o.lat, delete o.lng;
        for (var t = [ "closeclick", "links_changed", "pano_changed", "position_changed", "pov_changed", "resize", "visible_changed" ], n = S({
            visible: !0
        }, o), r = 0; r < t.length; r++) delete n[t[r]];
        var i = new google.maps.StreetViewPanorama(e, n);
        for (r = 0; r < t.length; r++) !function(e, t) {
            o[t] && google.maps.event.addListener(e, t, function() {
                o[t].apply(this);
            });
        }(i, t[r]);
        return i;
    }, p.prototype.on = function(e, t) {
        return p.on(e, this, t);
    }, p.prototype.off = function(e) {
        p.off(e, this);
    }, p.prototype.once = function(e, t) {
        return p.once(e, this, t);
    }, p.custom_events = [ "marker_added", "marker_removed", "polyline_added", "polyline_removed", "polygon_added", "polygon_removed", "geolocated", "geolocation_failed" ], 
    p.on = function(e, t, o) {
        if (-1 == p.custom_events.indexOf(e)) return t instanceof p && (t = t.map), google.maps.event.addListener(t, e, o);
        var n = {
            handler: o,
            eventName: e
        };
        return t.registered_events[e] = t.registered_events[e] || [], t.registered_events[e].push(n), 
        n;
    }, p.off = function(e, t) {
        -1 == p.custom_events.indexOf(e) ? (t instanceof p && (t = t.map), google.maps.event.clearListeners(t, e)) : t.registered_events[e] = [];
    }, p.once = function(e, t, o) {
        return -1 == p.custom_events.indexOf(e) ? (t instanceof p && (t = t.map), google.maps.event.addListenerOnce(t, e, o)) : void 0;
    }, p.fire = function(e, t, o) {
        if (-1 == p.custom_events.indexOf(e)) google.maps.event.trigger(t, e, Array.prototype.slice.apply(arguments).slice(2)); else if (e in o.registered_events) for (var n = o.registered_events[e], r = 0; r < n.length; r++) i = n[r].handler, 
        s = o, a = t, i.apply(s, [ a ]);
        var i, s, a;
    }, p.geolocate = function(t) {
        var o = t.always || t.complete;
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(e) {
            t.success(e), o && o();
        }, function(e) {
            t.error(e), o && o();
        }, t.options) : (t.not_supported(), o && o());
    }, p.geocode = function(e) {
        this.geocoder = new google.maps.Geocoder();
        var o = e.callback;
        e.hasOwnProperty("lat") && e.hasOwnProperty("lng") && (e.latLng = new google.maps.LatLng(e.lat, e.lng)), 
        delete e.lat, delete e.lng, delete e.callback, this.geocoder.geocode(e, function(e, t) {
            o(e, t);
        });
    }, "object" == typeof window.google && window.google.maps && (google.maps.Polygon.prototype.getBounds || (google.maps.Polygon.prototype.getBounds = function(e) {
        for (var t, o = new google.maps.LatLngBounds(), n = this.getPaths(), r = 0; r < n.getLength(); r++) {
            t = n.getAt(r);
            for (var i = 0; i < t.getLength(); i++) o.extend(t.getAt(i));
        }
        return o;
    }), google.maps.Polygon.prototype.containsLatLng || (google.maps.Polygon.prototype.containsLatLng = function(e) {
        var t = this.getBounds();
        if (null !== t && !t.contains(e)) return !1;
        for (var o = !1, n = this.getPaths().getLength(), r = 0; r < n; r++) for (var i = this.getPaths().getAt(r), s = i.getLength(), a = s - 1, l = 0; l < s; l++) {
            var p = i.getAt(l), c = i.getAt(a);
            (p.lng() < e.lng() && c.lng() >= e.lng() || c.lng() < e.lng() && p.lng() >= e.lng()) && p.lat() + (e.lng() - p.lng()) / (c.lng() - p.lng()) * (c.lat() - p.lat()) < e.lat() && (o = !o), 
            a = l;
        }
        return o;
    }), google.maps.Circle.prototype.containsLatLng || (google.maps.Circle.prototype.containsLatLng = function(e) {
        return !google.maps.geometry || google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), e) <= this.getRadius();
    }), google.maps.Rectangle.prototype.containsLatLng = function(e) {
        return this.getBounds().contains(e);
    }, google.maps.LatLngBounds.prototype.containsLatLng = function(e) {
        return this.contains(e);
    }, google.maps.Marker.prototype.setFences = function(e) {
        this.fences = e;
    }, google.maps.Marker.prototype.addFence = function(e) {
        this.fences.push(e);
    }, google.maps.Marker.prototype.getId = function() {
        return this.__gm_id;
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        if (null == this) throw new TypeError();
        var t = Object(this), o = t.length >>> 0;
        if (0 === o) return -1;
        var n = 0;
        if (1 < arguments.length && ((n = Number(arguments[1])) != n ? n = 0 : 0 != n && n != 1 / 0 && n != -1 / 0 && (n = (0 < n || -1) * Math.floor(Math.abs(n)))), 
        o <= n) return -1;
        for (var r = 0 <= n ? n : Math.max(o - Math.abs(n), 0); r < o; r++) if (r in t && t[r] === e) return r;
        return -1;
    }), p;
});