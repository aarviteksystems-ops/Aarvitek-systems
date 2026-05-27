import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Link, NavLink, useLocation, useNavigate, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe: pipe3, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe3(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const SITE_NAME = "Aarvitek Systems";
const SITE_URL = "https://aarviteksystems.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;
const COMPANY_PHONE = "+91 787 090 1336";
const COMPANY_EMAIL = "aarvitexsystems@gmail.com";
const SOCIAL_LINKS = [
  // Use placeholders or actual links when available
  "https://facebook.com/aarviteksystems",
  "https://twitter.com/aarviteksystems",
  "https://linkedin.com/company/aarviteksystems"
];
function generateMeta({
  title,
  description,
  url,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  canonical,
  robots = "index, follow"
}) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const canonicalUrl = canonical || fullUrl;
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: fullUrl },
    { property: "og:image", content: image },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_IN" },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    // Canonical
    { tagName: "link", rel: "canonical", href: canonicalUrl }
  ];
}
function generateJsonLd(schema) {
  return {
    tagName: "script",
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema)
    }
  };
}
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/images/logo.png`,
    // Assuming a logo exists or will exist
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": COMPANY_PHONE,
      "contactType": "customer service",
      "email": COMPANY_EMAIL,
      "areaServed": "IN",
      // India
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": SOCIAL_LINKS
  };
}
function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.item.startsWith("http") ? crumb.item : `${SITE_URL}${crumb.item}`
    }))
  };
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, _defaults$1 = {
  duration: 0.5,
  overwrite: false,
  delay: 0
}, _suppressOverwrites$1, _reverting$1, _context$2, _bigNum$1 = 1e8, _tinyNum = 1 / _bigNum$1, _2PI = Math.PI * 2, _HALF_PI = _2PI / 4, _gsID = 0, _sqrt = Math.sqrt, _cos = Math.cos, _sin = Math.sin, _isString$1 = function _isString(value) {
  return typeof value === "string";
}, _isFunction$1 = function _isFunction(value) {
  return typeof value === "function";
}, _isNumber$1 = function _isNumber(value) {
  return typeof value === "number";
}, _isUndefined = function _isUndefined2(value) {
  return typeof value === "undefined";
}, _isObject$1 = function _isObject(value) {
  return typeof value === "object";
}, _isNotFalse = function _isNotFalse2(value) {
  return value !== false;
}, _windowExists$2 = function _windowExists() {
  return typeof window !== "undefined";
}, _isFuncOrString = function _isFuncOrString2(value) {
  return _isFunction$1(value) || _isString$1(value);
}, _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
}, _isArray = Array.isArray, _randomExp = /random\([^)]+\)/g, _commaDelimExp = /,\s*/g, _strictNumExp = /(?:-?\.?\d|\.)+/gi, _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, _relExp = /[+-]=-?[.\d]+/, _delimitedValueExp = /[^,'"\[\]\s]+/gi, _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, _globalTimeline, _win$3, _coreInitted$2, _doc$3, _globals = {}, _installScope = {}, _coreReady, _install = function _install2(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap$2;
}, _missingPlugin = function _missingPlugin2(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
}, _warn = function _warn2(message, suppress) {
  return !suppress && console.warn(message);
}, _addGlobal = function _addGlobal2(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
}, _emptyFunc = function _emptyFunc2() {
  return 0;
}, _startAtRevertConfig = {
  suppressEvents: true,
  isStart: true,
  kill: false
}, _revertConfigNoKill = {
  suppressEvents: true,
  kill: false
}, _revertConfig = {
  suppressEvents: true
}, _reservedProps = {}, _lazyTweens = [], _lazyLookup = {}, _lastRenderedFrame, _plugins = {}, _effects = {}, _nextGCFrame = 30, _harnessPlugins = [], _callbackNames = "", _harness = function _harness2(targets) {
  var target = targets[0], harnessPlugin, i;
  _isObject$1(target) || _isFunction$1(target) || (targets = [targets]);
  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    i = _harnessPlugins.length;
    while (i-- && !_harnessPlugins[i].targetTest(target)) {
    }
    harnessPlugin = _harnessPlugins[i];
  }
  i = targets.length;
  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }
  return targets;
}, _getCache = function _getCache2(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
}, _getProperty = function _getProperty2(target, property, v) {
  return (v = target[property]) && _isFunction$1(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
}, _forEachName = function _forEachName2(names, func) {
  return (names = names.split(",")).forEach(func) || names;
}, _round$1 = function _round(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
}, _roundPrecise = function _roundPrecise2(value) {
  return Math.round(value * 1e7) / 1e7 || 0;
}, _parseRelative = function _parseRelative2(start, value) {
  var operator = value.charAt(0), end = parseFloat(value.substr(2));
  start = parseFloat(start);
  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
}, _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
  var l = toFind.length, i = 0;
  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) {
  }
  return i < l;
}, _lazyRender = function _lazyRender2() {
  var l = _lazyTweens.length, a = _lazyTweens.slice(0), i, tween;
  _lazyLookup = {};
  _lazyTweens.length = 0;
  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
}, _isRevertWorthy = function _isRevertWorthy2(animation) {
  return !!(animation._initted || animation._startAt || animation.add);
}, _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
  _lazyTweens.length && !_reverting$1 && _lazyRender();
  animation.render(time, suppressEvents, !!(_reverting$1 && time < 0 && _isRevertWorthy(animation)));
  _lazyTweens.length && !_reverting$1 && _lazyRender();
}, _numericIfPossible = function _numericIfPossible2(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString$1(value) ? value.trim() : value;
}, _passThrough$1 = function _passThrough(p) {
  return p;
}, _setDefaults$1 = function _setDefaults(obj, defaults2) {
  for (var p in defaults2) {
    p in obj || (obj[p] = defaults2[p]);
  }
  return obj;
}, _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
  return function(obj, defaults2) {
    for (var p in defaults2) {
      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults2[p]);
    }
  };
}, _merge = function _merge2(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }
  return base;
}, _mergeDeep = function _mergeDeep2(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject$1(toMerge[p]) ? _mergeDeep2(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }
  return base;
}, _copyExcluding = function _copyExcluding2(obj, excluding) {
  var copy = {}, p;
  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }
  return copy;
}, _inheritDefaults = function _inheritDefaults2(vars) {
  var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults$1;
  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }
  return vars;
}, _arraysMatch = function _arraysMatch2(a1, a2) {
  var i = a1.length, match = i === a2.length;
  while (match && i-- && a1[i] === a2[i]) {
  }
  return i < 0;
}, _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
  var prev = parent[lastProp], t;
  if (sortBy) {
    t = child[sortBy];
    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }
  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }
  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }
  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
}, _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }
  if (lastProp === void 0) {
    lastProp = "_last";
  }
  var prev = child._prev, next = child._next;
  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }
  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }
  child._next = child._prev = child.parent = null;
}, _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
  child._act = 0;
}, _uncache = function _uncache2(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    var a = animation;
    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }
  return animation;
}, _recacheAncestors = function _recacheAncestors2(animation) {
  var parent = animation.parent;
  while (parent && parent.parent) {
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }
  return animation;
}, _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
  return tween._startAt && (_reverting$1 ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
}, _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
}, _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
}, _animationCycle = function _animationCycle2(tTime, cycleDuration) {
  var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
  return tTime && whole === tTime ? whole - 1 : whole;
}, _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
}, _setEnd = function _setEnd2(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
}, _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
  var parent = animation._dp;
  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
    _setEnd(animation);
    parent._dirty || _uncache(parent, animation);
  }
  return animation;
}, _postAddChecks = function _postAddChecks2(timeline2, child) {
  var t;
  if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
    t = _parentToChildTotalTime(timeline2.rawTime(), child);
    if (!child._dur || _clamp$1(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  }
  if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
    if (timeline2._dur < timeline2.duration()) {
      t = timeline2;
      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime);
        t = t._dp;
      }
    }
    timeline2._zTime = -_tinyNum;
  }
}, _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber$1(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition$1(timeline2, position, child) : timeline2._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
  _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
  _isFromOrFromStart(child) || (timeline2._recent = child);
  skipChecks || _postAddChecks(timeline2, child);
  timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
  return timeline2;
}, _scrollTrigger = function _scrollTrigger2(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
}, _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
  _initTween(tween, time, tTime);
  if (!tween._initted) {
    return 1;
  }
  if (!force && tween._pt && !_reverting$1 && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);
    tween._lazy = [tTime, suppressEvents];
    return 1;
  }
}, _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
}, _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
}, _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
  if (repeatDelay && tween._repeat) {
    tTime = _clamp$1(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }
  if (ratio !== prevRatio || _reverting$1 || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
      return;
    }
    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
    suppressEvents || (suppressEvents = totalTime && !prevIteration);
    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
    totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
    tween._onUpdate && !suppressEvents && _callback$1(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback$1(tween, "onRepeat");
    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);
      if (!suppressEvents && !_reverting$1) {
        _callback$1(tween, ratio ? "onComplete" : "onReverseComplete", true);
        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
}, _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
  var child;
  if (time > prevTime) {
    child = animation._first;
    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }
      child = child._next;
    }
  } else {
    child = animation._last;
    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }
      child = child._prev;
    }
  }
}, _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
  animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
}, _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
}, _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
}, _parsePosition$1 = function _parsePosition(animation, position, percentAnimation) {
  var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum$1 ? recent.endTime(false) : animation._dur, i, offset, isPercent;
  if (_isString$1(position) && (isNaN(position) || position in labels)) {
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i = position.indexOf("=");
    if (offset === "<" || offset === ">") {
      i >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }
    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }
    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }
    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
  }
  return position == null ? clippedDuration : +position;
}, _createTweenType = function _createTweenType2(type, params, timeline2) {
  var isLegacy = _isNumber$1(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline2;
  if (type) {
    irVars = vars;
    parent = timeline2;
    while (parent && !("immediateRender" in irVars)) {
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }
    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
  }
  return new Tween(params[0], vars, params[varsIndex + 1]);
}, _conditionalReturn = function _conditionalReturn2(value, func) {
  return value || value === 0 ? func(value) : func;
}, _clamp$1 = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
}, getUnit = function getUnit2(value, v) {
  return !_isString$1(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
}, clamp = function clamp2(min, max, value) {
  return _conditionalReturn(value, function(v) {
    return _clamp$1(min, max, v);
  });
}, _slice = [].slice, _isArrayLike = function _isArrayLike2(value, nonEmpty) {
  return value && _isObject$1(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject$1(value[0])) && !value.nodeType && value !== _win$3;
}, _flatten = function _flatten2(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }
  return ar.forEach(function(value) {
    var _accumulator;
    return _isString$1(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
}, toArray = function toArray2(value, scope, leaveStrings) {
  return _context$2 && !scope && _context$2.selector ? _context$2.selector(value) : _isString$1(value) && !leaveStrings && (_coreInitted$2 || !_wake()) ? _slice.call((scope || _doc$3).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
}, selector = function selector2(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function(v) {
    var el = value.current || value.nativeElement || value;
    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc$3.createElement("div") : value);
  };
}, shuffle = function shuffle2(a) {
  return a.sort(function() {
    return 0.5 - Math.random();
  });
}, distribute = function distribute2(v) {
  if (_isFunction$1(v)) {
    return v;
  }
  var vars = _isObject$1(v) ? v : {
    each: v
  }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
  if (_isString$1(from)) {
    ratioX = ratioY = {
      center: 0.5,
      edges: 0.5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }
  return function(i, target, a) {
    var l = (a || vars).length, distances = cache[l], originX, originY, x, y, d, j, max, min, wrapAt;
    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum$1])[1];
      if (!wrapAt) {
        max = -_bigNum$1;
        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {
        }
        wrapAt < l && wrapAt--;
      }
      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - 0.5 : from % wrapAt;
      originY = wrapAt === _bigNum$1 ? 0 : ratios ? l * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum$1;
      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }
      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0;
      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }
    l = (distances[i] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
  };
}, _roundModifier = function _roundModifier2(v) {
  var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
  return function(raw) {
    var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
    return (n - n % 1) / p + (_isNumber$1(raw) ? 0 : getUnit(raw));
  };
}, snap = function snap2(snapTo, value) {
  var isArray = _isArray(snapTo), radius, is2D;
  if (!isArray && _isObject$1(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum$1;
    if (snapTo.values) {
      snapTo = toArray(snapTo.values);
      if (is2D = !_isNumber$1(snapTo[0])) {
        radius *= radius;
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }
  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction$1(snapTo) ? function(raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function(raw) {
    var x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum$1, closest = 0, i = snapTo.length, dx, dy;
    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }
      if (dx < min) {
        min = dx;
        closest = i;
      }
    }
    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber$1(raw) ? closest : closest + getUnit(raw);
  });
}, random = function random2(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
}, pipe = function pipe2() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }
  return function(value) {
    return functions.reduce(function(v, f) {
      return f(v);
    }, value);
  };
}, unitize = function unitize2(func, unit) {
  return function(value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
}, normalize = function normalize2(min, max, value) {
  return mapRange(min, max, 0, 1, value);
}, _wrapArray = function _wrapArray2(a, wrapper, value) {
  return _conditionalReturn(value, function(index) {
    return a[~~wrapper(index)];
  });
}, wrap = function wrap2(min, max, value) {
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
    return (range + (value2 - min) % range) % range + min;
  });
}, wrapYoyo = function wrapYoyo2(min, max, value) {
  var range = max - min, total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
    value2 = (total + (value2 - min) % total) % total || 0;
    return min + (value2 > range ? total - value2 : value2);
  });
}, _replaceRandom = function _replaceRandom2(s) {
  return s.replace(_randomExp, function(match) {
    var arIndex = match.indexOf("[") + 1, values = match.substring(arIndex || 7, arIndex ? match.indexOf("]") : match.length - 1).split(_commaDelimExp);
    return random(arIndex ? values : +values[0], arIndex ? 0 : +values[1], +values[2] || 1e-5);
  });
}, mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin, outRange = outMax - outMin;
  return _conditionalReturn(value, function(value2) {
    return outMin + ((value2 - inMin) / inRange * outRange || 0);
  });
}, interpolate = function interpolate2(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function(p2) {
    return (1 - p2) * start + p2 * end;
  };
  if (!func) {
    var isString = _isString$1(start), master = {}, p, i, interpolators, l, il;
    progress === true && (mutate = 1) && (progress = null);
    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;
      for (i = 1; i < l; i++) {
        interpolators.push(interpolate2(start[i - 1], start[i]));
      }
      l--;
      func = function func2(p2) {
        p2 *= l;
        var i2 = Math.min(il, ~~p2);
        return interpolators[i2](p2 - i2);
      };
      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }
    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }
      func = function func2(p2) {
        return _renderPropTweens(p2, master) || (isString ? start.p : start);
      };
    }
  }
  return _conditionalReturn(progress, func);
}, _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
  var labels = timeline2.labels, min = _bigNum$1, p, distance, label;
  for (p in labels) {
    distance = labels[p] - fromTime;
    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }
  return label;
}, _callback$1 = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars, callback = v[type], prevContext = _context$2, context3 = animation._ctx, params, scope, result;
  if (!callback) {
    return;
  }
  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender();
  context3 && (_context$2 = context3);
  result = params ? callback.apply(scope, params) : callback.call(scope);
  _context$2 = prevContext;
  return result;
}, _interrupt = function _interrupt2(animation) {
  _removeFromParent(animation);
  animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting$1);
  animation.progress() < 1 && _callback$1(animation, "onInterrupt");
  return animation;
}, _quickTween, _registerPluginQueue = [], _createPlugin = function _createPlugin2(config3) {
  if (!config3) return;
  config3 = !config3.name && config3["default"] || config3;
  if (_windowExists$2() || config3.headless) {
    var name = config3.name, isFunc = _isFunction$1(config3), Plugin = name && !isFunc && config3.init ? function() {
      this._props = [];
    } : config3, instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    }, statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };
    _wake();
    if (config3 !== Plugin) {
      if (_plugins[name]) {
        return;
      }
      _setDefaults$1(Plugin, _setDefaults$1(_copyExcluding(config3, instanceDefaults), statics));
      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
      _plugins[Plugin.prop = name] = Plugin;
      if (config3.targetTest) {
        _harnessPlugins.push(Plugin);
        _reservedProps[name] = 1;
      }
      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
    }
    _addGlobal(name, Plugin);
    config3.register && config3.register(gsap$2, Plugin, PropTween);
  } else {
    _registerPluginQueue.push(config3);
  }
}, _255 = 255, _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
}, _hue = function _hue2(h, m1, m2) {
  h += h < 0 ? 1 : h > 1 ? -1 : 0;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + 0.5 | 0;
}, splitColor = function splitColor2(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber$1(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0, r, g, b, h, s, l, max, min, d, wasHSL;
  if (!a) {
    if (v.substr(-1) === ",") {
      v = v.substr(0, v.length - 1);
    }
    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }
      if (v.length === 9) {
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }
      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);
      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1);
        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }
    a = a.map(Number);
  }
  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }
    a[0] = ~~(h + 0.5);
    a[1] = ~~(s * 100 + 0.5);
    a[2] = ~~(l * 100 + 0.5);
  }
  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
}, _colorOrderData = function _colorOrderData2(v) {
  var values = [], c = [], i = -1;
  v.split(_colorExp).forEach(function(v2) {
    var a = v2.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
}, _formatColors = function _formatColors2(s, toHSL, orderMatchData) {
  var result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0, c, shell, d, l;
  if (!colors) {
    return s;
  }
  colors = colors.map(function(color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });
  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;
    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;
      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }
  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;
    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }
  return result + shell[l];
}, _colorExp = (function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p;
  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }
  return new RegExp(s + ")", "gi");
})(), _hslExp = /hsl[a]?\(/, _colorStringFilter = function _colorStringFilter2(a) {
  var combined = a.join(" "), toHSL;
  _colorExp.lastIndex = 0;
  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
    return true;
  }
}, _tickerActive, _ticker = (function() {
  var _getTime2 = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime2(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners2 = [], _id, _req, _raf, _self, _delta, _i2, _tick = function _tick2(v) {
    var elapsed = _getTime2() - _lastUpdate, manual = v === true, overlap, dispatch, time, frame;
    (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;
    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1e3;
      _self.time = time = time / 1e3;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }
    manual || (_id = _req(_tick2));
    if (dispatch) {
      for (_i2 = 0; _i2 < _listeners2.length; _i2++) {
        _listeners2[_i2](time, _delta, frame, v);
      }
    }
  };
  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1e3 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted$2 && _windowExists$2()) {
          _win$3 = _coreInitted$2 = window;
          _doc$3 = _win$3.document || {};
          _globals.gsap = gsap$2;
          (_win$3.gsapVersions || (_win$3.gsapVersions = [])).push(gsap$2.version);
          _install(_installScope || _win$3.GreenSockGlobals || !_win$3.gsap && _win$3 || {});
          _registerPluginQueue.forEach(_createPlugin);
        }
        _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
        _id && _self.sleep();
        _req = _raf || function(f) {
          return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
        };
        _tickerActive = 1;
        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || Infinity;
      _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
    },
    fps: function fps(_fps) {
      _gap = 1e3 / (_fps || 240);
      _nextTime = _self.time * 1e3 + _gap;
    },
    add: function add(callback, once, prioritize) {
      var func = once ? function(t, d, f, v) {
        callback(t, d, f, v);
        _self.remove(func);
      } : callback;
      _self.remove(callback);
      _listeners2[prioritize ? "unshift" : "push"](func);
      _wake();
      return func;
    },
    remove: function remove(callback, i) {
      ~(i = _listeners2.indexOf(callback)) && _listeners2.splice(i, 1) && _i2 >= i && _i2--;
    },
    _listeners: _listeners2
  };
  return _self;
})(), _wake = function _wake2() {
  return !_tickerActive && _ticker.wake();
}, _easeMap = {}, _customEaseExp = /^[\d.\-M][\d.\-,\s]/, _quotesExp = /["']/g, _parseObjectInString = function _parseObjectInString2(value) {
  var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length, index, val, parsedVal;
  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }
  return obj;
}, _valueInParentheses = function _valueInParentheses2(value) {
  var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
}, _configEaseFromString = function _configEaseFromString2(name) {
  var split = (name + "").split("("), ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
}, _invertEase = function _invertEase2(ease) {
  return function(p) {
    return 1 - ease(1 - p);
  };
}, _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
  var child = timeline2._first, ease;
  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase2(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase2(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }
    child = child._next;
  }
}, _parseEase = function _parseEase2(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction$1(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
}, _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut2(p) {
      return 1 - easeIn(1 - p);
    };
  }
  if (easeInOut === void 0) {
    easeInOut = function easeInOut2(p) {
      return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }
  var ease = {
    easeIn,
    easeOut,
    easeInOut
  }, lowercaseName;
  _forEachName(names, function(name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });
  return ease;
}, _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
  return function(p) {
    return p < 0.5 ? (1 - easeOut(1 - p * 2)) / 2 : 0.5 + easeOut((p - 0.5) * 2) / 2;
  };
}, _configElastic = function _configElastic2(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);
  p2 = _2PI / p2;
  ease.config = function(amplitude2, period2) {
    return _configElastic2(type, amplitude2, period2);
  };
  return ease;
}, _configBack = function _configBack2(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }
  var easeOut = function easeOut2(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);
  ease.config = function(overshoot2) {
    return _configBack2(type, overshoot2);
  };
  return ease;
};
_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i) {
  var power = i < 5 ? i + 1 : i;
  _insertEase(name + ",Power" + (power - 1), i ? function(p) {
    return Math.pow(p, power);
  } : function(p) {
    return p;
  }, function(p) {
    return 1 - Math.pow(1 - p, power);
  }, function(p) {
    return p < 0.5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});
_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
(function(n, c) {
  var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + 0.75 : p < n3 ? n * (p -= 2.25 / c) * p + 0.9375 : n * Math.pow(p - 2.625 / c, 2) + 0.984375;
  };
  _insertEase("Bounce", function(p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);
_insertEase("Expo", function(p) {
  return Math.pow(2, 10 * (p - 1)) * p + p * p * p * p * p * p * (1 - p);
});
_insertEase("Circ", function(p) {
  return -(_sqrt(1 - p * p) - 1);
});
_insertEase("Sine", function(p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});
_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }
    var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
    return function(p) {
      return ((p2 * _clamp$1(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults$1.ease = _easeMap["quad.out"];
_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
  return _callbackNames += name + "," + name + "Params,";
});
var GSCache = function GSCache2(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
var Animation = /* @__PURE__ */ (function() {
  function Animation2(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;
    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }
    this._ts = 1;
    _setDuration(this, +vars.duration, 1, 1);
    this.data = vars.data;
    if (_context$2) {
      this._ctx = _context$2;
      _context$2.data.push(this);
    }
    _tickerActive || _ticker.wake();
  }
  var _proto = Animation2.prototype;
  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }
    return this._delay;
  };
  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };
  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }
    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };
  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();
    if (!arguments.length) {
      return this._tTime;
    }
    var parent = this._dp;
    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);
      !parent._dp || parent.parent || _postAddChecks(parent, this);
      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }
        parent = parent.parent;
      }
      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }
    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !this._initted && this._dur && _totalTime || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      this._ts || (this._pTime = _totalTime);
      _lazySafeRender(this, _totalTime, suppressEvents);
    }
    return this;
  };
  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
  };
  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  };
  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  };
  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  };
  _proto.timeScale = function timeScale(value, suppressEvents) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts;
    }
    if (this._rts === value) {
      return this;
    }
    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
    this.totalTime(_clamp$1(-Math.abs(this._delay), this.totalDuration(), tTime), suppressEvents !== false);
    _setEnd(this);
    return _recacheAncestors(this);
  };
  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }
    if (this._ps !== value) {
      this._ps = value;
      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
        this._ts = this._act = 0;
      } else {
        _wake();
        this._ts = this._rts;
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
      }
    }
    return this;
  };
  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = _roundPrecise(value);
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, this._start - this._delay);
      return this;
    }
    return this._start;
  };
  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };
  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp;
    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };
  _proto.revert = function revert(config3) {
    if (config3 === void 0) {
      config3 = _revertConfig;
    }
    var prevIsReverting = _reverting$1;
    _reverting$1 = config3;
    if (_isRevertWorthy(this)) {
      this.timeline && this.timeline.revert(config3);
      this.totalTime(-0.01, config3.suppressEvents);
    }
    this.data !== "nested" && config3.kill !== false && this.kill();
    _reverting$1 = prevIsReverting;
    return this;
  };
  _proto.globalTime = function globalTime(rawTime) {
    var animation = this, time = arguments.length ? rawTime : animation.rawTime();
    while (animation) {
      time = animation._start + time / (Math.abs(animation._ts) || 1);
      animation = animation._dp;
    }
    return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
  };
  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }
    return this._repeat === -2 ? Infinity : this._repeat;
  };
  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;
      _onUpdateTotalDuration(this);
      return time ? this.time(time) : this;
    }
    return this._rDelay;
  };
  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }
    return this._yoyo;
  };
  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition$1(this, position), _isNotFalse(suppressEvents));
  };
  _proto.restart = function restart(includeDelay, suppressEvents) {
    this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    this._dur || (this._zTime = -_tinyNum);
    return this;
  };
  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };
  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };
  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };
  _proto.resume = function resume() {
    return this.paused(false);
  };
  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
      return this;
    }
    return this._rts < 0;
  };
  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };
  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp, start = this._start, rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };
  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;
    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }
      return this;
    }
    return vars[type];
  };
  _proto.then = function then(onFulfilled) {
    var self = this, prevProm = self._prom;
    return new Promise(function(resolve) {
      var f = _isFunction$1(onFulfilled) ? onFulfilled : _passThrough$1, _resolve = function _resolve2() {
        var _then = self.then;
        self.then = null;
        prevProm && prevProm();
        _isFunction$1(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };
      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };
  _proto.kill = function kill() {
    _interrupt(this);
  };
  return Animation2;
})();
_setDefaults$1(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
var Timeline = /* @__PURE__ */ (function(_Animation) {
  _inheritsLoose(Timeline2, _Animation);
  function Timeline2(vars, position) {
    var _this;
    if (vars === void 0) {
      vars = {};
    }
    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }
  var _proto2 = Timeline2.prototype;
  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);
    return this;
  };
  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);
    return this;
  };
  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);
    return this;
  };
  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition$1(this, position), 1);
    return this;
  };
  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  };
  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition$1(this, position));
    return this;
  };
  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.render = function render3(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }
      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;
      if (crossingStart) {
        dur || (prevTime = this._zTime);
        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }
      if (this._repeat) {
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          prevIteration = _roundPrecise(tTime / cycleDuration);
          iteration = ~~prevIteration;
          if (iteration && iteration === prevIteration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime;
          !suppressEvents && this.parent && _callback$1(this, "onRepeat");
          if (this.vars.repeatRefresh && !isYoyo) {
            this.invalidate()._lock = 1;
            prevIteration = iteration;
          }
          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            return this;
          }
          dur = this._dur;
          tDur = this._tDur;
          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -1e-4;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }
          this._lock = 0;
          if (!this._ts && !prevPaused) {
            return this;
          }
          _propagateYoyoEase(this, isYoyo);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }
      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale;
      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0;
      }
      if (!prevTime && tTime && dur && !suppressEvents && !prevIteration) {
        _callback$1(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      if (time >= prevTime && totalTime >= 0) {
        child = this._first;
        while (child) {
          next = child._next;
          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum);
              break;
            }
          }
          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time;
        while (child) {
          next = child._prev;
          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting$1 && _isRevertWorthy(child));
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
              break;
            }
          }
          child = next;
        }
      }
      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
        if (this._ts) {
          this._start = prevStart;
          _setEnd(this);
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._onUpdate && !suppressEvents && _callback$1(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
        if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
          if (!this._lock) {
            (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
            if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
              _callback$1(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
              this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
            }
          }
        }
      }
    }
    return this;
  };
  _proto2.add = function add(child, position) {
    var _this2 = this;
    _isNumber$1(position) || (position = _parsePosition$1(this, position, child));
    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function(obj) {
          return _this2.add(obj, position);
        });
        return this;
      }
      if (_isString$1(child)) {
        return this.addLabel(child, position);
      }
      if (_isFunction$1(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }
    return this !== child ? _addToTimeline(this, child, position) : this;
  };
  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }
    if (tweens === void 0) {
      tweens = true;
    }
    if (timelines === void 0) {
      timelines = true;
    }
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum$1;
    }
    var a = [], child = this._first;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }
      child = child._next;
    }
    return a;
  };
  _proto2.getById = function getById2(id) {
    var animations = this.getChildren(1, 1, 1), i = animations.length;
    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };
  _proto2.remove = function remove(child) {
    if (_isString$1(child)) {
      return this.removeLabel(child);
    }
    if (_isFunction$1(child)) {
      return this.killTweensOf(child);
    }
    child.parent === this && _removeLinkedListItem(this, child);
    if (child === this._recent) {
      this._recent = this._last;
    }
    return _uncache(this);
  };
  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }
    this._forcing = 1;
    if (!this._dp && this._ts) {
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }
    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
    this._forcing = 0;
    return this;
  };
  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition$1(this, position);
    return this;
  };
  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };
  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition$1(this, position));
  };
  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition$1(this, position);
    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }
      child = child._next;
    }
  };
  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }
    return this;
  };
  _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
    var a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber$1(onlyActive), children;
    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }
      child = child._next;
    }
    return a;
  };
  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};
    var tl = this, endTime = _parsePosition$1(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults$1({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }
        _onStart && _onStart.apply(tween, onStartParams || []);
      }
    }, vars));
    return immediateRender ? tween.render(0) : tween;
  };
  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults$1({
      startAt: {
        time: _parsePosition$1(this, fromPosition)
      }
    }, vars));
  };
  _proto2.recent = function recent() {
    return this._recent;
  };
  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition$1(this, afterTime));
  };
  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition$1(this, beforeTime), 1);
  };
  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };
  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }
    var child = this._first, labels = this.labels, p;
    amount = _roundPrecise(amount);
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }
      child = child._next;
    }
    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }
    return _uncache(this);
  };
  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;
    while (child) {
      child.invalidate(soft);
      child = child._next;
    }
    return _Animation.prototype.invalidate.call(this, soft);
  };
  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }
    var child = this._first, next;
    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }
    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };
  _proto2.totalDuration = function totalDuration(value) {
    var max = 0, self = this, child = self._last, prevStart = _bigNum$1, prev, start, parent;
    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }
    if (self._dirty) {
      parent = self.parent;
      while (child) {
        prev = child._prev;
        child._dirty && child.totalDuration();
        start = child._start;
        if (start > prevStart && self._sort && child._ts && !self._lock) {
          self._lock = 1;
          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }
        if (start < 0 && child._ts) {
          max -= start;
          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += _roundPrecise(start / self._ts);
            self._time -= start;
            self._tTime -= start;
          }
          self.shiftChildren(-start, false, -Infinity);
          prevStart = 0;
        }
        child._end > max && child._ts && (max = child._end);
        child = prev;
      }
      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
      self._dirty = 0;
    }
    return self._tDur;
  };
  Timeline2.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
      _lastRenderedFrame = _ticker.frame;
    }
    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) {
        if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }
          child || _ticker.sleep();
        }
      }
    }
  };
  return Timeline2;
})(Animation);
_setDefaults$1(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a;
  pt.b = start;
  pt.e = end;
  start += "";
  end += "";
  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }
  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop);
    start = a[0];
    end = a[1];
  }
  startNums = start.match(_complexStringNumExp) || [];
  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);
    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }
    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0;
      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }
  pt.c = index < end.length ? end.substring(index, end.length) : "";
  pt.fp = funcParam;
  if (_relExp.test(end) || hasRandom) {
    pt.e = 0;
  }
  this._pt = pt;
  return pt;
}, _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
  _isFunction$1(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction$1(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction$1(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction$1(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
  if (_isString$1(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (end.charAt(1) === "=") {
      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
      if (pt || pt === 0) {
        end = pt;
      }
    }
  }
  if (!optional || parsedStart !== end || _forceAllPropTweens) {
    if (!isNaN(parsedStart * end) && end !== "") {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }
    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
}, _processVars = function _processVars2(vars, index, target, targets, tween) {
  _isFunction$1(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
  if (!_isObject$1(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString$1(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }
  var copy = {}, p;
  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }
  return copy;
}, _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;
  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
      i = plugin._props.length;
      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }
  return plugin;
}, _overwritingTween, _forceAllPropTweens, _initTween = function _initTween2(tween, time, tTime) {
  var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites$1, tl = tween.timeline, cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults$1.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults$1.ease)) : 0;
  if (yoyoEase && tween._yoyo && !tween._repeat) {
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }
  tween._from = !tl && !!vars.runBackwards;
  if (!tl || keyframes && !vars.stagger) {
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop];
    cleanVars = _copyExcluding(vars, _reservedProps);
    if (prevStartAt) {
      prevStartAt._zTime < 0 && prevStartAt.progress(1);
      time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
      prevStartAt._lazy = 0;
    }
    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults$1({
        data: "isStart",
        overwrite: false,
        parent,
        immediateRender: true,
        lazy: !prevStartAt && _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate && function() {
          return _callback$1(tween, "onUpdate");
        },
        stagger: 0
      }, startAt)));
      tween._startAt._dp = 0;
      tween._startAt._sat = tween;
      time < 0 && (_reverting$1 || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
      if (immediateRender) {
        if (dur && time <= 0 && tTime <= 0) {
          time && (tween._zTime = time);
          return;
        }
      }
    } else if (runBackwards && dur) {
      if (!prevStartAt) {
        time && (immediateRender = false);
        p = _setDefaults$1({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
          immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent
          //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars);
        _removeFromParent(tween._startAt = Tween.set(targets, p));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting$1 ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
        tween._zTime = time;
        if (!immediateRender) {
          _initTween2(tween._startAt, _tinyNum, _tinyNum);
        } else if (!time) {
          return;
        }
      }
    }
    tween._pt = tween._ptCache = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;
    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
      index = fullTargets === targets ? i : fullTargets.indexOf(target);
      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
        plugin._props.forEach(function(name) {
          ptLookup[name] = pt;
        });
        plugin.priority && (hasPriority = 1);
      }
      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }
      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;
        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
        overwritten = !tween.parent;
        _overwritingTween = 0;
      }
      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }
    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween);
  }
  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten;
  keyframes && time <= 0 && tl.render(_bigNum$1, true, true);
}, _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i;
  if (!ptCache) {
    ptCache = tween._ptCache[property] = [];
    lookup = tween._ptLookup;
    i = tween._targets.length;
    while (i--) {
      pt = lookup[i][property];
      if (pt && pt.d && pt.d._pt) {
        pt = pt.d._pt;
        while (pt && pt.p !== property && pt.fp !== property) {
          pt = pt._next;
        }
      }
      if (!pt) {
        _forceAllPropTweens = 1;
        tween.vars[property] = "+=0";
        _initTween(tween, time);
        _forceAllPropTweens = 0;
        return skipRecursion ? _warn(property + " not eligible for reset") : 1;
      }
      ptCache.push(pt);
    }
  }
  i = ptCache.length;
  while (i--) {
    rootPT = ptCache[i];
    pt = rootPT._pt || rootPT;
    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
    pt.c = value - pt.s;
    rootPT.e && (rootPT.e = _round$1(value) + getUnit(rootPT.e));
    rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
  }
}, _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p, i, aliases;
  if (!propertyAliases) {
    return vars;
  }
  copy = _merge({}, vars);
  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;
      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }
  return copy;
}, _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut", p, a;
  if (_isArray(obj)) {
    a = allProps[prop] || (allProps[prop] = []);
    obj.forEach(function(value, i) {
      return a.push({
        t: i / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p in obj) {
      a = allProps[p] || (allProps[p] = []);
      p === "ease" || a.push({
        t: parseFloat(prop),
        v: obj[p],
        e: ease
      });
    }
  }
}, _parseFuncOrString = function _parseFuncOrString2(value, tween, i, target, targets) {
  return _isFunction$1(value) ? value.call(tween, i, target, targets) : _isString$1(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
}, _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", _staggerPropsToSkip = {};
_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
  return _staggerPropsToSkip[name] = 1;
});
var Tween = /* @__PURE__ */ (function(_Animation2) {
  _inheritsLoose(Tween2, _Animation2);
  function Tween2(targets, vars, position, skipInherit) {
    var _this3;
    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }
    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber$1(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = [];
    _this3._overwrite = overwrite;
    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults2 || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;
      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);
        if (_isObject$1(stagger)) {
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }
        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i];
          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
          if (!stagger && l === 1 && copy.delay) {
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }
          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }
        tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
      } else if (keyframes) {
        _inheritDefaults(_setDefaults$1(tl.vars.defaults, {
          ease: "none"
        }));
        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0, a, kf, v;
        if (_isArray(keyframes)) {
          keyframes.forEach(function(frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration();
        } else {
          copy = {};
          for (p in keyframes) {
            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
          }
          for (p in copy) {
            a = copy[p].sort(function(a2, b) {
              return a2.t - b.t;
            });
            time = 0;
            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v[p] = kf.v;
              tl.to(parsedTargets, v, time);
              time += v.duration;
            }
          }
          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          });
        }
      }
      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0;
    }
    if (overwrite === true && !_suppressOverwrites$1) {
      _overwritingTween = _assertThisInitialized(_this3);
      _globalTimeline.killTweensOf(parsedTargets);
      _overwritingTween = 0;
    }
    _addToTimeline(parent, _assertThisInitialized(_this3), position);
    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);
    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum;
      _this3.render(Math.max(0, -delay) || 0);
    }
    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }
  var _proto3 = Tween2.prototype;
  _proto3.render = function render3(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
      time = tTime;
      timeline2 = this.timeline;
      if (this._repeat) {
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          prevIteration = _roundPrecise(tTime / cycleDuration);
          iteration = ~~prevIteration;
          if (iteration && iteration === prevIteration) {
            time = dur;
            iteration--;
          } else if (time > dur) {
            time = dur;
          }
        }
        isYoyo = this._yoyo && iteration & 1;
        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        if (time === prevTime && !force && this._initted && iteration === prevIteration) {
          this._tTime = tTime;
          return this;
        }
        if (iteration !== prevIteration) {
          timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
          if (this.vars.repeatRefresh && !isYoyo && !this._lock && time !== cycleDuration && this._initted) {
            this._lock = force = 1;
            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }
      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0;
          return this;
        }
        if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
          return this;
        }
        if (dur !== this._dur) {
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._tTime = tTime;
      this._time = time;
      if (!this._act && this._ts) {
        this._act = 1;
        this._lazy = 0;
      }
      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }
      if (!prevTime && tTime && !suppressEvents && !prevIteration) {
        _callback$1(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      pt = this._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
        _callback$1(this, "onUpdate");
      }
      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback$1(this, "onRepeat");
      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          _callback$1(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto3.targets = function targets() {
    return this._targets;
  };
  _proto3.invalidate = function invalidate(soft) {
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };
  _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur);
    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
      return this.resetTo(property, value, start, startIsRelative, 1);
    }
    _alignPlayhead(this, 0);
    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };
  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }
    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting$1);
      return this;
    }
    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
      return this;
    }
    var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i;
    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }
    overwrittenProps = this._op = this._op || [];
    if (vars !== "all") {
      if (_isString$1(vars)) {
        p = {};
        _forEachName(vars, function(name) {
          return p[name] = 1;
        });
        vars = p;
      }
      vars = _addAliasesToVars(parsedTargets, vars);
    }
    i = parsedTargets.length;
    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];
        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }
        for (p in props) {
          pt = curLookup && curLookup[p];
          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }
            delete curLookup[p];
          }
          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }
    this._initted && !this._pt && firstPT && _interrupt(this);
    return this;
  };
  Tween2.to = function to(targets, vars) {
    return new Tween2(targets, vars, arguments[2]);
  };
  Tween2.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };
  Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween2(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };
  Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };
  Tween2.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween2(targets, vars);
  };
  Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };
  return Tween2;
})(Animation);
_setDefaults$1(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
_forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
  Tween[name] = function() {
    var tl = new Timeline(), params = _slice.call(arguments, 0);
    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
var _setterPlain = function _setterPlain2(target, property, value) {
  return target[property] = value;
}, _setterFunc = function _setterFunc2(target, property, value) {
  return target[property](value);
}, _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
  return target[property](data.fp, value);
}, _setterAttribute = function _setterAttribute2(target, property, value) {
  return target.setAttribute(property, value);
}, _getSetter = function _getSetter2(target, property) {
  return _isFunction$1(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
}, _renderPlain = function _renderPlain2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
}, _renderBoolean = function _renderBoolean2(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
}, _renderComplexString = function _renderComplexString2(ratio, data) {
  var pt = data._pt, s = "";
  if (!ratio && data.b) {
    s = data.b;
  } else if (ratio === 1 && data.e) {
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
      pt = pt._next;
    }
    s += data.c;
  }
  data.set(data.t, data.p, s, data);
}, _renderPropTweens = function _renderPropTweens2(ratio, data) {
  var pt = data._pt;
  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
}, _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
  var pt = this._pt, next;
  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
}, _killPropTweensOf = function _killPropTweensOf2(property) {
  var pt = this._pt, hasNonDependentRemaining, next;
  while (pt) {
    next = pt._next;
    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }
    pt = next;
  }
  return !hasNonDependentRemaining;
}, _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
}, _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
  var pt = parent._pt, next, pt2, first, last;
  while (pt) {
    next = pt._next;
    pt2 = first;
    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }
    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }
    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }
    pt = next;
  }
  parent._pt = first;
};
var PropTween = /* @__PURE__ */ (function() {
  function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;
    if (next) {
      next._prev = this;
    }
  }
  var _proto4 = PropTween2.prototype;
  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set;
    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target;
    this.tween = tween;
  };
  return PropTween2;
})();
_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
  return _reservedProps[name] = 1;
});
_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults$1,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
var _media = [], _listeners$1 = {}, _emptyArray$1 = [], _lastMediaTime = 0, _contextID = 0, _dispatch$1 = function _dispatch(type) {
  return (_listeners$1[type] || _emptyArray$1).map(function(f) {
    return f();
  });
}, _onMediaChange = function _onMediaChange2() {
  var time = Date.now(), matches = [];
  if (time - _lastMediaTime > 2) {
    _dispatch$1("matchMediaInit");
    _media.forEach(function(c) {
      var queries = c.queries, conditions = c.conditions, match, p, anyMatch, toggled;
      for (p in queries) {
        match = _win$3.matchMedia(queries[p]).matches;
        match && (anyMatch = 1);
        if (match !== conditions[p]) {
          conditions[p] = match;
          toggled = 1;
        }
      }
      if (toggled) {
        c.revert();
        anyMatch && matches.push(c);
      }
    });
    _dispatch$1("matchMediaRevert");
    matches.forEach(function(c) {
      return c.onMatch(c, function(func) {
        return c.add(null, func);
      });
    });
    _lastMediaTime = time;
    _dispatch$1("matchMedia");
  }
};
var Context = /* @__PURE__ */ (function() {
  function Context2(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = [];
    this.isReverted = false;
    this.id = _contextID++;
    func && this.add(func);
  }
  var _proto5 = Context2.prototype;
  _proto5.add = function add(name, func, scope) {
    if (_isFunction$1(name)) {
      scope = func;
      func = name;
      name = _isFunction$1;
    }
    var self = this, f = function f2() {
      var prev = _context$2, prevSelector = self.selector, result;
      prev && prev !== self && prev.data.push(self);
      scope && (self.selector = selector(scope));
      _context$2 = self;
      result = func.apply(self, arguments);
      _isFunction$1(result) && self._r.push(result);
      _context$2 = prev;
      self.selector = prevSelector;
      self.isReverted = false;
      return result;
    };
    self.last = f;
    return name === _isFunction$1 ? f(self, function(func2) {
      return self.add(null, func2);
    }) : name ? self[name] = f : f;
  };
  _proto5.ignore = function ignore(func) {
    var prev = _context$2;
    _context$2 = null;
    func(this);
    _context$2 = prev;
  };
  _proto5.getTweens = function getTweens() {
    var a = [];
    this.data.forEach(function(e) {
      return e instanceof Context2 ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
    });
    return a;
  };
  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };
  _proto5.kill = function kill(revert, matchMedia2) {
    var _this4 = this;
    if (revert) {
      (function() {
        var tweens = _this4.getTweens(), i2 = _this4.data.length, t;
        while (i2--) {
          t = _this4.data[i2];
          if (t.data === "isFlip") {
            t.revert();
            t.getChildren(true, true, false).forEach(function(tween) {
              return tweens.splice(tweens.indexOf(tween), 1);
            });
          }
        }
        tweens.map(function(t2) {
          return {
            g: t2._dur || t2._delay || t2._sat && !t2._sat.vars.immediateRender ? t2.globalTime(0) : -Infinity,
            t: t2
          };
        }).sort(function(a, b) {
          return b.g - a.g || -Infinity;
        }).forEach(function(o) {
          return o.t.revert(revert);
        });
        i2 = _this4.data.length;
        while (i2--) {
          t = _this4.data[i2];
          if (t instanceof Timeline) {
            if (t.data !== "nested") {
              t.scrollTrigger && t.scrollTrigger.revert();
              t.kill();
            }
          } else {
            !(t instanceof Tween) && t.revert && t.revert(revert);
          }
        }
        _this4._r.forEach(function(f) {
          return f(revert, _this4);
        });
        _this4.isReverted = true;
      })();
    } else {
      this.data.forEach(function(e) {
        return e.kill && e.kill();
      });
    }
    this.clear();
    if (matchMedia2) {
      var i = _media.length;
      while (i--) {
        _media[i].id === this.id && _media.splice(i, 1);
      }
    }
  };
  _proto5.revert = function revert(config3) {
    this.kill(config3 || {});
  };
  return Context2;
})();
var MatchMedia = /* @__PURE__ */ (function() {
  function MatchMedia2(scope) {
    this.contexts = [];
    this.scope = scope;
    _context$2 && _context$2.data.push(this);
  }
  var _proto6 = MatchMedia2.prototype;
  _proto6.add = function add(conditions, func, scope) {
    _isObject$1(conditions) || (conditions = {
      matches: conditions
    });
    var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p, active;
    _context$2 && !context3.selector && (context3.selector = _context$2.selector);
    this.contexts.push(context3);
    func = context3.add("onMatch", func);
    context3.queries = conditions;
    for (p in conditions) {
      if (p === "all") {
        active = 1;
      } else {
        mq = _win$3.matchMedia(conditions[p]);
        if (mq) {
          _media.indexOf(context3) < 0 && _media.push(context3);
          (cond[p] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }
    active && func(context3, function(f) {
      return context3.add(null, f);
    });
    return this;
  };
  _proto6.revert = function revert(config3) {
    this.kill(config3 || {});
  };
  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function(c) {
      return c.kill(revert, true);
    });
  };
  return MatchMedia2;
})();
var _gsap$1 = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args.forEach(function(config3) {
      return _createPlugin(config3);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString$1(target) && (target = toArray(target)[0]);
    var getter = _getCache(target || {}).get, format = unit ? _passThrough$1 : _numericIfPossible;
    unit === "native" && (unit = "");
    return !target ? target : !property ? function(property2, unit2, uncache2) {
      return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);
    if (target.length > 1) {
      var setters = target.map(function(t) {
        return gsap$2.quickSetter(t, property, unit);
      }), l = setters.length;
      return function(value) {
        var i = l;
        while (i--) {
          setters[i](value);
        }
      };
    }
    target = target[0] || {};
    var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
      var p2 = new Plugin();
      _quickTween._pt = 0;
      p2.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p2.render(1, p2);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);
    return Plugin ? setter : function(value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _setDefaults22;
    var tween = gsap$2.to(target, _setDefaults$1((_setDefaults22 = {}, _setDefaults22[property] = "+=0.1", _setDefaults22.paused = true, _setDefaults22.stagger = 0, _setDefaults22), vars || {})), func = function func2(value, start, startIsRelative) {
      return tween.resetTo(property, value, start, startIsRelative);
    };
    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults$1.ease));
    return _mergeDeep(_defaults$1, value || {});
  },
  config: function config2(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function(pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });
    _effects[name] = function(targets, vars, tl) {
      return effect(toArray(targets), _setDefaults$1(vars || {}, defaults2), tl);
    };
    if (extendTimeline) {
      Timeline.prototype[name] = function(targets, vars, position) {
        return this.add(_effects[name](targets, _isObject$1(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }
    var tl = new Timeline(vars), child, next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
    _globalTimeline.remove(tl);
    tl._dp = 0;
    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;
    while (child) {
      next = child._next;
      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }
      child = next;
    }
    _addToTimeline(_globalTimeline, tl, 0);
    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context$2;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function(c) {
      var cond = c.conditions, found, p;
      for (p in cond) {
        if (cond[p]) {
          cond[p] = false;
          found = 1;
        }
      }
      found && c.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a = _listeners$1[type] || (_listeners$1[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a = _listeners$1[type], i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  },
  utils: {
    wrap,
    wrapYoyo,
    distribute,
    random,
    snap,
    normalize,
    getUnit,
    clamp,
    splitColor,
    toArray,
    selector,
    mapRange,
    pipe,
    unitize,
    interpolate,
    shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween,
    globals: _addGlobal,
    Tween,
    Timeline,
    Animation,
    getCache: _getCache,
    _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting$1;
    },
    context: function context2(toAdd) {
      if (toAdd && _context$2) {
        _context$2.data.push(toAdd);
        toAdd._ctx = _context$2;
      }
      return _context$2;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites$1 = value;
    }
  }
};
_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
  return _gsap$1[name] = Tween[name];
});
_ticker.add(Timeline.updateRoot);
_quickTween = _gsap$1.to({}, {
  duration: 0
});
var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
  var pt = plugin._pt;
  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }
  return pt;
}, _addModifiers = function _addModifiers2(tween, modifiers) {
  var targets = tween._targets, p, i, pt;
  for (p in modifiers) {
    i = targets.length;
    while (i--) {
      pt = tween._ptLookup[i][p];
      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          pt = _getPluginPropTween(pt, p);
        }
        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
}, _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
  return {
    name,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init4(target, vars, tween) {
      tween._onInit = function(tween2) {
        var temp, p;
        if (_isString$1(vars)) {
          temp = {};
          _forEachName(vars, function(name2) {
            return temp[name2] = 1;
          });
          vars = temp;
        }
        if (modifier) {
          temp = {};
          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }
          vars = temp;
        }
        _addModifiers(tween2, vars);
      };
    }
  };
};
var gsap$2 = _gsap$1.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt, v;
    this.tween = tween;
    for (p in vars) {
      v = target.getAttribute(p) || "";
      pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
      pt.op = p;
      pt.b = v;
      this._props.push(p);
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;
    while (pt) {
      _reverting$1 ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
      pt = pt._next;
    }
  }
}, {
  name: "endArray",
  headless: 1,
  init: function init2(target, value) {
    var i = value.length;
    while (i--) {
      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap$1;
Tween.version = Timeline.version = gsap$2.version = "3.14.2";
_coreReady = 1;
_windowExists$2() && _wake();
_easeMap.Power0;
_easeMap.Power1;
_easeMap.Power2;
_easeMap.Power3;
_easeMap.Power4;
_easeMap.Linear;
_easeMap.Quad;
_easeMap.Cubic;
_easeMap.Quart;
_easeMap.Quint;
_easeMap.Strong;
_easeMap.Elastic;
_easeMap.Back;
_easeMap.SteppedEase;
_easeMap.Bounce;
_easeMap.Sine;
_easeMap.Expo;
_easeMap.Circ;
var _win$2, _doc$2, _docElement, _pluginInitted, _tempDiv, _recentSetterPlugin, _reverting, _windowExists$1 = function _windowExists2() {
  return typeof window !== "undefined";
}, _transformProps = {}, _RAD2DEG = 180 / Math.PI, _DEG2RAD = Math.PI / 180, _atan2 = Math.atan2, _bigNum = 1e8, _capsExp$1 = /([A-Z])/g, _horizontalExp = /(left|right|width|margin|padding|x)/i, _complexExp = /[\s,\(]\S/, _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, _renderCSSProp = function _renderCSSProp2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
}, _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
}, _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
}, _renderCSSPropWithBeginningAndEnd = function _renderCSSPropWithBeginningAndEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
}, _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
}, _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
}, _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
}, _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
  return target.style[property] = value;
}, _setterCSSProp = function _setterCSSProp2(target, property, value) {
  return target.style.setProperty(property, value);
}, _setterTransform = function _setterTransform2(target, property, value) {
  return target._gsap[property] = value;
}, _setterScale = function _setterScale2(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
}, _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
}, _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
}, _transformProp$1 = "transform", _transformOriginProp = _transformProp$1 + "Origin", _saveStyle = function _saveStyle2(property, isNotCSS) {
  var _this = this;
  var target = this.target, style = target.style, cache = target._gsap;
  if (property in _transformProps && style) {
    this.tfm = this.tfm || {};
    if (property !== "transform") {
      property = _propertyAliases[property] || property;
      ~property.indexOf(",") ? property.split(",").forEach(function(a) {
        return _this.tfm[a] = _get(target, a);
      }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property);
      property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
    } else {
      return _propertyAliases.transform.split(",").forEach(function(p) {
        return _saveStyle2.call(_this, p, isNotCSS);
      });
    }
    if (this.props.indexOf(_transformProp$1) >= 0) {
      return;
    }
    if (cache.svg) {
      this.svgo = target.getAttribute("data-svg-origin");
      this.props.push(_transformOriginProp, isNotCSS, "");
    }
    property = _transformProp$1;
  }
  (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
}, _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
  if (style.translate) {
    style.removeProperty("translate");
    style.removeProperty("scale");
    style.removeProperty("rotate");
  }
}, _revertStyle = function _revertStyle2() {
  var props = this.props, target = this.target, style = target.style, cache = target._gsap, i, p;
  for (i = 0; i < props.length; i += 3) {
    if (!props[i + 1]) {
      props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp$1, "-$1").toLowerCase());
    } else if (props[i + 1] === 2) {
      target[props[i]](props[i + 2]);
    } else {
      target[props[i]] = props[i + 2];
    }
  }
  if (this.tfm) {
    for (p in this.tfm) {
      cache[p] = this.tfm[p];
    }
    if (cache.svg) {
      cache.renderTransform();
      target.setAttribute("data-svg-origin", this.svgo || "");
    }
    i = _reverting();
    if ((!i || !i.isStart) && !style[_transformProp$1]) {
      _removeIndependentTransforms(style);
      if (cache.zOrigin && style[_transformOriginProp]) {
        style[_transformOriginProp] += " " + cache.zOrigin + "px";
        cache.zOrigin = 0;
        cache.renderTransform();
      }
      cache.uncache = 1;
    }
  }
}, _getStyleSaver = function _getStyleSaver2(target, properties) {
  var saver = {
    target,
    props: [],
    revert: _revertStyle,
    save: _saveStyle
  };
  target._gsap || gsap$2.core.getCache(target);
  properties && target.style && target.nodeType && properties.split(",").forEach(function(p) {
    return saver.save(p);
  });
  return saver;
}, _supports3D, _createElement = function _createElement2(type, ns) {
  var e = _doc$2.createElementNS ? _doc$2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$2.createElement(type);
  return e && e.style ? e : _doc$2.createElement(type);
}, _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp$1, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
}, _prefixes = "O,Moz,ms,Ms,Webkit".split(","), _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
  var e = element || _tempDiv, s = e.style, i = 5;
  if (property in s && !preferPrefix) {
    return property;
  }
  property = property.charAt(0).toUpperCase() + property.substr(1);
  while (i-- && !(_prefixes[i] + property in s)) {
  }
  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
}, _initCore$1 = function _initCore() {
  if (_windowExists$1() && window.document) {
    _win$2 = window;
    _doc$2 = _win$2.document;
    _docElement = _doc$2.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _createElement("div");
    _transformProp$1 = _checkPropPrefix(_transformProp$1);
    _transformOriginProp = _transformProp$1 + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
    _supports3D = !!_checkPropPrefix("perspective");
    _reverting = gsap$2.core.reverting;
    _pluginInitted = 1;
  }
}, _getReparentedCloneBBox = function _getReparentedCloneBBox2(target) {
  var owner = target.ownerSVGElement, svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), clone = target.cloneNode(true), bbox;
  clone.style.display = "block";
  svg.appendChild(clone);
  _docElement.appendChild(svg);
  try {
    bbox = clone.getBBox();
  } catch (e) {
  }
  svg.removeChild(clone);
  _docElement.removeChild(svg);
  return bbox;
}, _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
  var i = attributesArray.length;
  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
}, _getBBox = function _getBBox2(target) {
  var bounds, cloned;
  try {
    bounds = target.getBBox();
  } catch (error) {
    bounds = _getReparentedCloneBBox(target);
    cloned = 1;
  }
  bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target));
  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
}, _isSVG = function _isSVG2(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
}, _removeProperty = function _removeProperty2(target, property) {
  if (property) {
    var style = target.style, first2Chars;
    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp$1;
    }
    if (style.removeProperty) {
      first2Chars = property.substr(0, 2);
      if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
        property = "-" + property;
      }
      style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp$1, "-$1").toLowerCase());
    } else {
      style.removeAttribute(property);
    }
  }
}, _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;
  plugin._props.push(property);
  return pt;
}, _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
}, _nonStandardLayouts = {
  grid: 1,
  flex: 1
}, _convertToUnit = function _convertToUnit2(target, property, value, unit) {
  var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }
  curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);
  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return _round$1(toPercent ? curValue / px * amount : curValue / 100 * px);
  }
  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }
  if (!parent || parent === _doc$2 || !parent.appendChild) {
    parent = _doc$2.body;
  }
  cache = parent._gsap;
  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
    return _round$1(curValue / cache.width * amount);
  } else {
    if (toPercent && (property === "height" || property === "width")) {
      var v = target.style[property];
      target.style[property] = amount + unit;
      px = target[measureProperty];
      v ? target.style[property] = v : _removeProperty(target, property);
    } else {
      (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static");
      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";
    }
    if (horizontal && toPercent) {
      cache = _getCache(parent);
      cache.time = _ticker.time;
      cache.width = parent[measureProperty];
    }
  }
  return _round$1(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
}, _get = function _get2(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore$1();
  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];
    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }
  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];
    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
    }
  }
  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
}, _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
  if (!start || start === "none") {
    var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor");
    }
  }
  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
  pt.b = start;
  pt.e = end;
  start += "";
  end += "";
  if (end.substring(0, 6) === "var(--") {
    end = _getComputedProperty(target, end.substring(4, end.indexOf(")")));
  }
  if (end === "auto") {
    startValue = target.style[prop];
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
  }
  a = [start, end];
  _colorStringFilter(a);
  start = a[0];
  end = a[1];
  startValues = start.match(_numWithUnitExp) || [];
  endValues = end.match(_numWithUnitExp) || [];
  if (endValues.length) {
    while (result = _numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }
      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _numWithUnitExp.lastIndex - endUnit.length;
        if (!endUnit) {
          endUnit = endUnit || _config.units[prop] || startUnit;
          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }
        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        }
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }
  _relExp.test(end) && (pt.e = 0);
  this._pt = pt;
  return pt;
}, _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
  var split = value.split(" "), x = split[0], y = split[1] || "50%";
  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    value = x;
    x = y;
    y = value;
  }
  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
}, _renderClearProps = function _renderClearProps2(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i;
    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;
      while (--i > -1) {
        prop = props[i];
        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp$1;
        }
        _removeProperty(target, prop);
      }
    }
    if (clearTransforms) {
      _removeProperty(target, _transformProp$1);
      if (cache) {
        cache.svg && target.removeAttribute("transform");
        style.scale = style.rotate = style.translate = "none";
        _parseTransform(target, 1);
        cache.uncache = 1;
        _removeIndependentTransforms(style);
      }
    }
  }
}, _specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;
      plugin._props.push(property);
      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, _identity2DMatrix = [1, 0, 0, 1, 0, 0], _rotationalProperties = {}, _isNullTransform = function _isNullTransform2(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
}, _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
  var matrixString = _getComputedProperty(target, _transformProp$1);
  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round$1);
}, _getMatrix = function _getMatrix2(target, force2D) {
  var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix;
    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;
    if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
      addedToDOM = 1;
      nextSibling = target.nextElementSibling;
      _docElement.appendChild(target);
    }
    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");
    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }
  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
}, _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y;
  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }
  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }
  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px";
  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }
  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
}, _parseTransform = function _parseTransform2(target, uncache) {
  var cache = target._gsap || new GSCache(target);
  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }
  var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  if (cs.translate) {
    if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
      style[_transformProp$1] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp$1] !== "none" ? cs[_transformProp$1] : "");
    }
    style.scale = style.rotate = style.translate = "none";
  }
  matrix = _getMatrix(target, cache.svg);
  if (cache.svg) {
    if (cache.uncache) {
      t2 = target.getBBox();
      origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
      t1 = "";
    } else {
      t1 = !uncache && target.getAttribute("data-svg-origin");
    }
    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }
  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;
  if (matrix !== _identity2DMatrix) {
    a = matrix[0];
    b = matrix[1];
    c = matrix[2];
    d = matrix[3];
    x = a12 = matrix[4];
    y = a22 = matrix[5];
    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      }
    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      }
      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      }
      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }
      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }
      scaleX = _round$1(Math.sqrt(a * a + b * b + c * c));
      scaleY = _round$1(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }
    if (cache.svg) {
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp$1));
      t1 && target.setAttribute("transform", t1);
    }
  }
  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }
  uncache = uncache || cache.uncache;
  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = _round$1(scaleX);
  cache.scaleY = _round$1(scaleY);
  cache.rotation = _round$1(rotation) + deg;
  cache.rotationX = _round$1(rotationX) + deg;
  cache.rotationY = _round$1(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;
  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }
  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
}, _firstTwoOnly = function _firstTwoOnly2(value) {
  return (value = value.split(" "))[0] + " " + value[1];
}, _addPxTranslate = function _addPxTranslate2(target, start, value) {
  var unit = getUnit(start);
  return _round$1(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
}, _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;
  _renderCSSTransforms(ratio, cache);
}, _zeroDeg = "0deg", _zeroPx = "0px", _endParenthesis = ") ", _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
  var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }
  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }
  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }
  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }
  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }
  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }
  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }
  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }
  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }
  target.style[_transformProp$1] = transforms || "translate(0, 0)";
}, _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
  var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y), a11, a21, a12, a22, temp;
  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);
  if (skewY) {
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }
  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;
    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;
      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }
    a11 = _round$1(a11);
    a21 = _round$1(a21);
    a12 = _round$1(a12);
    a22 = _round$1(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }
  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }
  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = _round$1(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = _round$1(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }
  if (xPercent || yPercent) {
    temp = target.getBBox();
    tx = _round$1(tx + xPercent / 100 * temp.width);
    ty = _round$1(ty + yPercent / 100 * temp.height);
  }
  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp$1] = temp);
}, _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
  var cap = 360, isString = _isString$1(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
  if (isString) {
    direction = endValue.split("_")[1];
    if (direction === "short") {
      change %= cap;
      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }
    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }
  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";
  plugin._props.push(property);
  return pt;
}, _assign = function _assign2(target, source) {
  for (var p in source) {
    target[p] = source[p];
  }
  return target;
}, _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
  var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit;
  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp$1] = transforms;
    endCache = _parseTransform(target, 1);
    _removeProperty(target, _transformProp$1);
    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp$1];
    style[_transformProp$1] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp$1] = startValue;
  }
  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];
    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      startUnit = getUnit(startValue);
      endUnit = getUnit(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;
      plugin._props.push(p);
    }
  }
  _assign(endCache, startCache);
};
_forEachName("padding,margin,Width,Radius", function(name, index) {
  var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function(side) {
    return index < 2 ? name + side : "border" + side + name;
  });
  _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
    var a, vars;
    if (arguments.length < 4) {
      a = props.map(function(prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }
    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function(prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore$1,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init3(target, vars, tween, index, targets) {
    var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps, finalTransformValue;
    _pluginInitted || _initCore$1();
    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;
    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }
      endValue = vars[p];
      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
        continue;
      }
      type = typeof endValue;
      specialProp = _specialProps[p];
      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }
      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = _replaceRandom(endValue);
      }
      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _colorExp.lastIndex = 0;
        if (!_colorExp.test(startValue)) {
          startUnit = getUnit(startValue);
          endUnit = getUnit(endValue);
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        }
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
        inlineProps.push(p, 0, style[p]);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          _isString$1(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
          getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
        } else {
          startValue = _get(target, p);
        }
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);
        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              startNum = 0;
            }
            inlineProps.push("visibility", 0, style.visibility);
            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }
          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }
        isTransformRelated = p in _transformProps;
        if (isTransformRelated) {
          this.styles.save(p);
          finalTransformValue = endValue;
          if (type === "string" && endValue.substring(0, 6) === "var(--") {
            endValue = _getComputedProperty(target, endValue.substring(4, endValue.indexOf(")")));
            if (endValue.substring(0, 5) === "calc(") {
              var origPerspective = target.style.perspective;
              target.style.perspective = endValue;
              endValue = _getComputedProperty(target, "perspective");
              origPerspective ? target.style.perspective = origPerspective : _removeProperty(target, "perspective");
            }
            endNum = parseFloat(endValue);
          }
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp$1, 0, 1, cache.renderTransform, cache, 0, -1);
            transformPropTween.dep = 1;
          }
          if (p === "scale") {
            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue);
            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0;
              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }
            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);
            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }
        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0);
          endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;
          if (isTransformRelated && finalTransformValue !== endValue) {
            this._pt.b = startValue;
            this._pt.e = finalTransformValue;
            this._pt.r = _renderCSSPropWithBeginningAndEnd;
          } else if (startUnit !== endUnit && endUnit !== "%") {
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
          } else if (p !== "parseTransform") {
            _missingPlugin(p, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
        }
        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : typeof target[p] === "function" ? inlineProps.push(p, 2, target[p]()) : inlineProps.push(p, 1, startValue || target[p]));
        props.push(p);
      }
    }
    hasPriority && _sortPropTweensByPriority(this);
  },
  render: function render2(ratio, data) {
    if (data.tween._time || !_reverting()) {
      var pt = data._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
  },
  core: {
    _removeProperty,
    _getMatrix
  }
};
gsap$2.utils.checkPrefix = _checkPropPrefix;
gsap$2.core.getStyleSaver = _getStyleSaver;
(function(positionAndScale, rotation, others, aliases) {
  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
    _transformProps[name] = 1;
  });
  _forEachName(rotation, function(name) {
    _config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  _forEachName(aliases, function(name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
  _config.units[name] = "px";
});
gsap$2.registerPlugin(CSSPlugin);
var gsapWithCSS = gsap$2.registerPlugin(CSSPlugin) || gsap$2;
gsapWithCSS.core.Tween;
let useIsomorphicLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect, isConfig = (value) => value && !Array.isArray(value) && typeof value === "object", emptyArray = [], defaultConfig = {}, _gsap = gsapWithCSS;
const useGSAP = (callback, dependencies = emptyArray) => {
  let config3 = defaultConfig;
  if (isConfig(callback)) {
    config3 = callback;
    callback = null;
    dependencies = "dependencies" in config3 ? config3.dependencies : emptyArray;
  } else if (isConfig(dependencies)) {
    config3 = dependencies;
    dependencies = "dependencies" in config3 ? config3.dependencies : emptyArray;
  }
  callback && typeof callback !== "function" && console.warn("First parameter must be a function or config object");
  const { scope, revertOnUpdate } = config3, mounted = useRef(false), context3 = useRef(_gsap.context(() => {
  }, scope)), contextSafe = useRef((func) => context3.current.add(null, func)), deferCleanup = dependencies && dependencies.length && !revertOnUpdate;
  deferCleanup && useIsomorphicLayoutEffect(() => {
    mounted.current = true;
    return () => context3.current.revert();
  }, emptyArray);
  useIsomorphicLayoutEffect(() => {
    callback && context3.current.add(callback, scope);
    if (!deferCleanup || !mounted.current) {
      return () => context3.current.revert();
    }
  }, dependencies);
  return { context: context3.current, contextSafe: contextSafe.current };
};
useGSAP.register = (core) => {
  _gsap = core;
};
useGSAP.headless = true;
gsapWithCSS.registerPlugin(useGSAP);
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useGSAP(() => {
    const tl = gsapWithCSS.timeline();
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }).from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");
  }, { scope: navRef });
  useGSAP(() => {
    if (isOpen && mobileMenuRef.current) {
      gsapWithCSS.from(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out"
      });
      gsapWithCSS.from(".mobile-nav-item", {
        x: -20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1
      });
    }
  }, { dependencies: [isOpen], scope: mobileMenuRef });
  return /* @__PURE__ */ jsxs("nav", { ref: navRef, className: `fixed w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isScrolled ? "-top-32 opacity-0 pointer-events-none" : "top-0 opacity-100"}`, children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-20 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 flex items-center nav-item", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-2xl font-black tracking-tighter text-white", children: "AARVITEK" }) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex space-x-8 items-center bg-white/5 px-6 py-2 rounded-full border border-white/10", children: [
        /* @__PURE__ */ jsx(NavLink, { to: "/", className: ({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-slate-400"}`, children: "Home" }),
        /* @__PURE__ */ jsxs("div", { className: "relative group nav-item", children: [
          /* @__PURE__ */ jsxs("button", { className: "text-sm font-medium text-slate-400 group-hover:text-white flex items-center gap-1 cursor-pointer h-10", children: [
            "About Us",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2", children: [
            /* @__PURE__ */ jsx(Link, { to: "/about", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Company Profile" }),
            /* @__PURE__ */ jsx(Link, { to: "/director-message", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Director's Message" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative group nav-item", children: [
          /* @__PURE__ */ jsxs("button", { className: "text-sm font-medium text-slate-400 group-hover:text-white flex items-center gap-1 cursor-pointer h-10", children: [
            "Services",
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2", children: [
            /* @__PURE__ */ jsx(Link, { to: "/web-development", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Web Development" }),
            /* @__PURE__ */ jsx(Link, { to: "/website-design", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Website Design" }),
            /* @__PURE__ */ jsx(Link, { to: "/graphic-design", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Graphic Design" }),
            /* @__PURE__ */ jsx(Link, { to: "/ecommerce", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "E-Commerce" }),
            /* @__PURE__ */ jsx(Link, { to: "/video-editing", className: "block px-4 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors", children: "Video Editing" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(NavLink, { to: "/portfolio", className: ({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-slate-400"}`, children: "Portfolio" }),
        /* @__PURE__ */ jsx(NavLink, { to: "/clients", className: ({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-slate-400"}`, children: "Clients" }),
        /* @__PURE__ */ jsx(NavLink, { to: "/locations", className: ({ isActive }) => `nav-item text-sm font-medium transition-colors hover:text-white ${isActive ? "text-white" : "text-slate-400"}`, children: "Locations" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center nav-item", children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "px-6 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]", children: "Book a Call" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex md:hidden nav-item", children: /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(!isOpen), className: "text-slate-300 hover:text-white focus:outline-none", children: /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: isOpen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { ref: mobileMenuRef, className: "md:hidden", children: isOpen && /* @__PURE__ */ jsx("div", { className: "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "px-4 pt-2 pb-6 space-y-1", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5", children: "Home" }),
      /* @__PURE__ */ jsx(Link, { to: "/about", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5", children: "About Us" }),
      /* @__PURE__ */ jsx(Link, { to: "/director-message", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 pl-6 border-l border-white/10", children: "Director's Message" }),
      /* @__PURE__ */ jsxs("div", { className: "py-2 pl-4", children: [
        /* @__PURE__ */ jsx("p", { className: "mobile-nav-item px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest", children: "Services" }),
        /* @__PURE__ */ jsx(Link, { to: "/web-development", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "Web Development" }),
        /* @__PURE__ */ jsx(Link, { to: "/website-design", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "Website Design" }),
        /* @__PURE__ */ jsx(Link, { to: "/graphic-design", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "Graphic Design" }),
        /* @__PURE__ */ jsx(Link, { to: "/ecommerce", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "E-Commerce" }),
        /* @__PURE__ */ jsx(Link, { to: "/video-editing", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-2 rounded-xl text-base font-medium text-slate-400 hover:text-white hover:bg-white/5", children: "Video Editing" })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/portfolio", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5", children: "Portfolio" }),
      /* @__PURE__ */ jsx(Link, { to: "/clients", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5", children: "Clients" }),
      /* @__PURE__ */ jsx(Link, { to: "/locations", onClick: () => setIsOpen(false), className: "mobile-nav-item block px-3 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/5", children: "Locations" }),
      /* @__PURE__ */ jsx("div", { className: "mobile-nav-item mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/contact", onClick: () => setIsOpen(false), className: "block w-full text-center px-4 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]", children: "Book a Call" }) })
    ] }) }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#050505] pt-24 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative rounded-[2rem] overflow-hidden mb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 opacity-50" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "relative border border-white/10 bg-white/5 backdrop-blur-sm p-12 md:p-20 text-center rounded-[2rem]", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-bold text-white mb-6", children: [
          "Let Aarvitek handle IT so you can ",
          /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "Scale Faster" }),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-2xl mx-auto mb-10 text-lg", children: "We'll help you automate, build, and optimize your digital presence. Get back to what you do best—growing your business." }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "inline-block px-8 py-4 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]", children: "Book a discovery call" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-1", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "text-3xl font-black tracking-tighter text-white mb-6 block", children: "AARVITEK" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm leading-relaxed mb-8", children: "Empowering businesses with innovative IT solutions. We craft digital experiences that drive growth and success." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsxs("a", { href: "#", className: "w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Facebook" }),
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "#", className: "w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Twitter" }),
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-6", children: "Services" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/web-development", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Web Development" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/website-design", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Website Design" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/graphic-design", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Graphic Design" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/ecommerce", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "E-Commerce Solutions" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/video-editing", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Video Editing" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-6", children: "Company" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/director-message", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Director's Message" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/portfolio", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Portfolio" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/locations", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Our Locations" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/terms", className: "text-slate-400 hover:text-white text-sm transition-colors", children: "Terms of Service" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-6", children: "Contact" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-slate-400", children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5 text-purple-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
              /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
            ] }),
            /* @__PURE__ */ jsx("span", { children: "New Delhi, India" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-slate-400", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-purple-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
            /* @__PURE__ */ jsx("a", { href: "mailto:aarvitexsystems@gmail.com", className: "hover:text-white transition-colors", children: "aarvitexsystems@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 text-sm text-slate-400", children: [
            /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 text-purple-500 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
            /* @__PURE__ */ jsx("a", { href: "tel:+917870901336", className: "hover:text-white transition-colors", children: "+91 787 090 1336" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 px-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500 text-center md:text-left", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Aarvitek Systems. All rights reserved."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600", children: "Crafted with precision in New Delhi" })
    ] })
  ] }) });
}
function Dock() {
  const [showDock, setShowDock] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
      if (window.scrollY > 300 && !isNearBottom) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
  const handleNav = (id) => {
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: `fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showDock ? "translate-y-0 opacity-100 scale-100" : "translate-y-24 opacity-0 scale-90 pointer-events-none"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-1.5 md:gap-2 px-2 md:px-4 py-2 md:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] h-16 md:h-[72px]", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-12 md:hover:w-16 hover:h-12 md:hover:h-16 hover:-translate-y-1.5 md:hover:-translate-y-2 mx-0.5 md:mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6 group-hover:w-6 md:group-hover:w-8 group-hover:h-6 md:group-hover:h-8 text-slate-300 group-hover:text-purple-400 transition-all duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }),
      /* @__PURE__ */ jsx("span", { className: "absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg", children: "Home" })
    ] }),
    /* @__PURE__ */ jsxs(Link, { to: "/about", className: "group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-12 md:hover:w-16 hover:h-12 md:hover:h-16 hover:-translate-y-1.5 md:hover:-translate-y-2 mx-0.5 md:mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6 group-hover:w-6 md:group-hover:w-8 group-hover:h-6 md:group-hover:h-8 text-slate-300 group-hover:text-pink-400 transition-all duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
      /* @__PURE__ */ jsx("span", { className: "absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg", children: "About Us" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "group relative mx-0.5 md:mx-1 flex flex-col justify-end", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 pb-4 flex flex-col gap-2 items-center opacity-0 translate-y-4 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50 origin-bottom", children: [
        /* @__PURE__ */ jsx(Link, { to: "/video-editing", className: "w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all", children: "Video Editing" }),
        /* @__PURE__ */ jsx(Link, { to: "/ecommerce", className: "w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all", children: "eCommerce" }),
        /* @__PURE__ */ jsx(Link, { to: "/graphic-design", className: "w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all", children: "Graphic Design" }),
        /* @__PURE__ */ jsx(Link, { to: "/website-design", className: "w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all", children: "Website Design" }),
        /* @__PURE__ */ jsx(Link, { to: "/web-development", className: "w-40 px-4 py-2.5 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center transition-all", children: "Web Dev" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => handleNav("services"), className: "relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300 group-hover:w-12 md:group-hover:w-16 group-hover:h-12 md:group-hover:h-16 group-hover:-translate-y-1.5 md:group-hover:-translate-y-2 border border-white/5 group-hover:border-white/20 shadow-lg cursor-pointer origin-bottom", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6 group-hover:w-6 md:group-hover:w-8 group-hover:h-6 md:group-hover:h-8 text-slate-300 group-hover:text-blue-400 transition-all duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" }) }) })
    ] }),
    /* @__PURE__ */ jsxs(Link, { to: "/portfolio", className: "group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-12 md:hover:w-16 hover:h-12 md:hover:h-16 hover:-translate-y-1.5 md:hover:-translate-y-2 mx-0.5 md:mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6 group-hover:w-6 md:group-hover:w-8 group-hover:h-6 md:group-hover:h-8 text-slate-300 group-hover:text-amber-400 transition-all duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
      /* @__PURE__ */ jsx("span", { className: "absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg", children: "Portfolio" })
    ] }),
    /* @__PURE__ */ jsxs(Link, { to: "/clients", className: "group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-12 md:hover:w-16 hover:h-12 md:hover:h-16 hover:-translate-y-1.5 md:hover:-translate-y-2 mx-0.5 md:mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6 group-hover:w-6 md:group-hover:w-8 group-hover:h-6 md:group-hover:h-8 text-slate-300 group-hover:text-yellow-400 transition-all duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }) }),
      /* @__PURE__ */ jsx("span", { className: "absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg", children: "Clients" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-px h-6 md:h-8 bg-white/20 mx-1.5 md:mx-2 self-center" }),
    /* @__PURE__ */ jsxs(Link, { to: "/contact", className: "group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-12 md:hover:w-16 hover:h-12 md:hover:h-16 hover:-translate-y-1.5 md:hover:-translate-y-2 mx-0.5 md:mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6 group-hover:w-6 md:group-hover:w-8 group-hover:h-6 md:group-hover:h-8 text-slate-300 group-hover:text-indigo-400 transition-all duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
      /* @__PURE__ */ jsx("span", { className: "absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg", children: "Book a call" })
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), className: "group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:w-12 md:hover:w-16 hover:h-12 md:hover:h-16 hover:-translate-y-1.5 md:hover:-translate-y-2 mx-0.5 md:mx-1 border border-white/5 hover:border-white/20 shadow-lg cursor-pointer origin-bottom", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 md:w-6 md:h-6 group-hover:w-6 md:group-hover:w-8 group-hover:h-6 md:group-hover:h-8 text-slate-300 group-hover:text-emerald-400 transition-all duration-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 15l7-7 7 7" }) }),
      /* @__PURE__ */ jsx("span", { className: "absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs py-1 px-3 rounded-md font-medium whitespace-nowrap pointer-events-none shadow-lg", children: "Top" })
    ] })
  ] }) });
}
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  const phoneNumber = "917870901336";
  const defaultMessage = encodeURIComponent(
    "Hello Aarvitek Systems! I would like to book a free consultation and learn more about your digital transformation services."
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed bottom-24 right-6 md:right-8 z-40 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visible ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-12 scale-75 pointer-events-none"}`,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-[#25D366]/40 blur-md animate-ping duration-1000" }),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#25D366] to-emerald-400 opacity-20 blur-sm animate-[pulse_2s_infinite]" }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: waUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "Chat on WhatsApp",
            className: "group relative flex items-center justify-center w-14 h-14 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 hover:border-[#25D366]/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-1 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] opacity-10 group-hover:opacity-20 transition-opacity" }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-7 h-7 text-[#25D366] group-hover:text-white transition-colors duration-300",
                  fill: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", { d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.019 14.113.992 11.5.992c-5.448 0-9.88 4.373-9.884 9.802-.001 1.637.5 3.23 1.45 4.81l-1.027 3.75 3.864-1.008zm11.366-7.467c-.29-.145-1.716-.847-1.978-.942-.262-.096-.453-.145-.644.145-.191.29-.739.942-.906 1.134-.167.19-.334.213-.624.069-.29-.145-1.224-.451-2.33-1.439-.86-.767-1.44-1.716-1.608-2.008-.168-.29-.018-.447.127-.591.13-.13.29-.339.435-.508.145-.17.193-.29.29-.483.097-.19.048-.362-.024-.508-.073-.145-.644-1.55-.882-2.122-.232-.559-.467-.483-.644-.492-.166-.008-.358-.01-.55-.01s-.502.072-.765.358c-.263.286-1.004.981-1.004 2.392 0 1.41 1.027 2.775 1.17 2.969.145.193 2.022 3.087 4.899 4.329.684.296 1.218.473 1.634.605.688.219 1.314.188 1.81.114.551-.082 1.716-.701 1.957-1.378.24-.677.24-1.258.17-1.378-.073-.12-.263-.193-.553-.339z" })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "absolute right-16 scale-0 origin-right translate-x-2 opacity-0 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 backdrop-blur-md text-white text-xs font-semibold py-1.5 px-3 rounded-lg border border-white/10 whitespace-nowrap shadow-xl pointer-events-none", children: "Chat with an Expert" })
            ]
          }
        )
      ]
    }
  );
}
function CalendlyModal() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    window.addEventListener("open-calendly", handleOpen);
    window.addEventListener("close-calendly", handleClose);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-calendly", handleOpen);
      window.removeEventListener("close-calendly", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[1000] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300",
        onClick: () => setIsOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-4xl h-[85vh] bg-[#0c051a]/90 backdrop-blur-2xl border border-purple-500/20 rounded-[2.5rem] shadow-[0_0_60px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col z-10 animate-[zoomIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02] z-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white font-black text-sm", children: "A" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-white font-extrabold text-lg", children: "Book Free Consultation" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs mt-0.5", children: "Select a convenient time slot for your discovery call" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsOpen(false),
            className: "w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-105 active:scale-95 cursor-pointer",
            "aria-label": "Close modal",
            children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 w-full h-full bg-[#030105] z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-none z-0", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" }) }),
        /* @__PURE__ */ jsx(
          "iframe",
          {
            src: "https://calendly.com/d/c4s-3p8-x6h?background_color=030105&text_color=ffffff&primary_color=a855f7&hide_landing_page=1&hide_gdpr_banner=1",
            width: "100%",
            height: "100%",
            frameBorder: "0",
            className: "relative z-10 w-full h-full border-none",
            title: "Book a Consultation Meeting"
          }
        )
      ] })
    ] })
  ] });
}
function FloatingEnquiryForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const drawerRef = useRef(null);
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    window.addEventListener("open-enquiry", handleOpen);
    window.addEventListener("close-enquiry", handleClose);
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    const handleClickOutside = (e) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target) && !e.target.closest(".enquiry-trigger")) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("open-enquiry", handleOpen);
      window.removeEventListener("close-enquiry", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone/WhatsApp is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const WEB3FORMS_ACCESS_KEY = "2bf3198d-6793-47b6-bffa-cb44d5716c25";
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Enquiry from ${formData.name} — ${formData.service}`,
          from_name: "Aarvitek Systems Website",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          botcheck: ""
          // honeypot spam protection
        })
      });
      const data = await response.json();
      if (data.success) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Web Development",
          message: ""
        });
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsOpen(false);
        }, 4e3);
      } else {
        setIsSubmitting(false);
        setErrors({ message: "Submission failed. Please try again or contact us via WhatsApp." });
      }
    } catch {
      setIsSubmitting(false);
      setErrors({ message: "Network error. Please check your connection and try again." });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "enquiry-trigger hidden md:flex fixed right-0 top-[40%] -translate-y-1/2 z-40 items-center justify-center gap-2 bg-gradient-to-l from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wider uppercase py-4 px-3 rounded-l-2xl border-l border-y border-white/20 shadow-[0_10px_30px_rgba(168,85,247,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-x-1 cursor-pointer [writing-mode:vertical-lr] rotate-0",
        style: { textOrientation: "mixed" },
        children: [
          /* @__PURE__ */ jsx("span", { className: "mb-2 text-base select-none", children: "📩" }),
          " Enquire Now"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "enquiry-trigger md:hidden fixed bottom-44 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(168,85,247,0.4)] border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer",
        "aria-label": "Open Inquiry Form",
        children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-black/50 backdrop-blur-sm z-[900] transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
        onClick: () => setIsOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: drawerRef,
        className: `fixed top-0 right-0 h-screen w-full sm:w-[460px] bg-[#090312]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-[950] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[250px] h-[250px] bg-purple-600/10 blur-[60px] rounded-full pointer-events-none" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-indigo-600/10 blur-[60px] rounded-full pointer-events-none" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02] z-10 shrink-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl", children: "📊" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-extrabold text-lg", children: "Send an Enquiry" }),
                /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs mt-0.5", children: "We respond in less than 2 hours" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer",
                children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-8 py-6 relative z-10", children: submitSuccess ? (
            /* High-fidelity Success Animation Screen */
            /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center space-y-6 animate-[fadeIn_0.5s_ease-out]", children: [
              /* @__PURE__ */ jsx("div", { className: "relative w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-[scaleUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)]", children: /* @__PURE__ */ jsx("svg", { className: "w-12 h-12 text-white animate-[drawCheck_0.5s_ease-in-out_0.2s_both]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3", d: "M5 13l4 4L19 7" }) }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-white font-black text-2xl", children: "Enquiry Received!" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-sm max-w-xs mx-auto leading-relaxed", children: "Thank you for reaching out to Aarvitek Systems. Our digital consultants have been notified and will contact you within the next **2 hours**." }),
              /* @__PURE__ */ jsx("div", { className: "w-full h-1 bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-emerald-500 animate-[loadingBar_4s_linear_both]" }) })
            ] })
          ) : (
            /* Enquiry Form */
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-slate-300 font-bold text-xs uppercase tracking-wider", children: "Your Name" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "name",
                    value: formData.name,
                    onChange: handleChange,
                    placeholder: "e.g. John Doe",
                    className: `w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-purple-500/50"}`
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-slate-300 font-bold text-xs uppercase tracking-wider", children: "Email Address" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    value: formData.email,
                    onChange: handleChange,
                    placeholder: "e.g. john@company.com",
                    className: `w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-purple-500/50"}`
                  }
                ),
                errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.email })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-slate-300 font-bold text-xs uppercase tracking-wider", children: "Phone / WhatsApp Number" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    name: "phone",
                    value: formData.phone,
                    onChange: handleChange,
                    placeholder: "e.g. +91 99999 99999",
                    className: `w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-purple-500/50"}`
                  }
                ),
                errors.phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.phone })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-slate-300 font-bold text-xs uppercase tracking-wider", children: "Service Needed" }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      name: "service",
                      value: formData.service,
                      onChange: handleChange,
                      className: "w-full px-4 py-3 rounded-xl bg-[#110924] border border-white/10 text-white focus:outline-none focus:border-purple-500/50 appearance-none cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "Web Development", children: "Web Development" }),
                        /* @__PURE__ */ jsx("option", { value: "eCommerce Platforms", children: "eCommerce Platforms" }),
                        /* @__PURE__ */ jsx("option", { value: "Website UI/UX Design", children: "Website UI/UX Design" }),
                        /* @__PURE__ */ jsx("option", { value: "Graphic Design & Branding", children: "Graphic Design & Branding" }),
                        /* @__PURE__ */ jsx("option", { value: "Video Editing & Motion UX", children: "Video Editing & Motion UX" }),
                        /* @__PURE__ */ jsx("option", { value: "AI Automation Integrations", children: "AI Automation Integrations" }),
                        /* @__PURE__ */ jsx("option", { value: "Other / Full Suite", children: "Other / Full Suite" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-slate-300 font-bold text-xs uppercase tracking-wider", children: "Project Scope / Details" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    name: "message",
                    value: formData.message,
                    onChange: handleChange,
                    rows: 4,
                    placeholder: "Briefly describe your objectives, timelines, and budget constraints...",
                    className: `w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 focus:outline-none focus:bg-white/10 transition-all resize-none ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-white/10 focus:border-purple-500/50"}`
                  }
                ),
                errors.message && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs mt-1 font-medium", children: errors.message })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting,
                  className: "w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2",
                  children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" }),
                    "Sending Enquiry..."
                  ] }) : "Submit Proposal Request"
                }
              )
            ] })
          ) })
        ]
      }
    )
  ] });
}
const meta$p = () => {
  return [{
    name: "theme-color",
    content: "#000000"
  }, {
    name: "format-detection",
    content: "telephone=no"
  }, generateJsonLd(getOrganizationSchema())];
};
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  let location;
  try {
    location = useLocation();
  } catch (e) {
  }
  const isPromo = location?.pathname === "/promo";
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    className: "dark scroll-smooth",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [!isPromo && /* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx("main", {
        className: `min-h-screen ${isPromo ? "pt-0" : "pt-16"}`,
        children
      }), !isPromo && /* @__PURE__ */ jsx(WhatsAppButton, {}), !isPromo && /* @__PURE__ */ jsx(CalendlyModal, {}), !isPromo && /* @__PURE__ */ jsx(FloatingEnquiryForm, {}), !isPromo && /* @__PURE__ */ jsx(Dock, {}), !isPromo && /* @__PURE__ */ jsx(Footer, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  meta: meta$p
}, Symbol.toStringTag, { value: "Module" }));
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  return Constructor;
}
var gsap$1, _coreInitted$1, _win$1, _doc$1, _docEl$1, _body$1, _isTouch, _pointerType, ScrollTrigger$1, _root$1, _normalizer$1, _eventTypes, _context$1, _getGSAP$1 = function _getGSAP() {
  return gsap$1 || typeof window !== "undefined" && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
}, _startup$1 = 1, _observers = [], _scrollers = [], _proxies = [], _getTime$1 = Date.now, _bridge = function _bridge2(name, value) {
  return value;
}, _integrate = function _integrate2() {
  var core = ScrollTrigger$1.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
  scrollers.push.apply(scrollers, _scrollers);
  proxies.push.apply(proxies, _proxies);
  _scrollers = scrollers;
  _proxies = proxies;
  _bridge = function _bridge3(name, value) {
    return data[name](value);
  };
}, _getProxyProp = function _getProxyProp2(element, property) {
  return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
}, _isViewport$1 = function _isViewport(el) {
  return !!~_root$1.indexOf(el);
}, _addListener$1 = function _addListener(element, type, func, passive, capture) {
  return element.addEventListener(type, func, {
    passive: passive !== false,
    capture: !!capture
  });
}, _removeListener$1 = function _removeListener(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
}, _scrollLeft = "scrollLeft", _scrollTop = "scrollTop", _onScroll$1 = function _onScroll() {
  return _normalizer$1 && _normalizer$1.isPressed || _scrollers.cache++;
}, _scrollCacheFunc = function _scrollCacheFunc2(f, doNotCache) {
  var cachingFunc = function cachingFunc2(value) {
    if (value || value === 0) {
      _startup$1 && (_win$1.history.scrollRestoration = "manual");
      var isNormalizing = _normalizer$1 && _normalizer$1.isPressed;
      value = cachingFunc2.v = Math.round(value) || (_normalizer$1 && _normalizer$1.iOS ? 1 : 0);
      f(value);
      cachingFunc2.cacheID = _scrollers.cache;
      isNormalizing && _bridge("ss", value);
    } else if (doNotCache || _scrollers.cache !== cachingFunc2.cacheID || _bridge("ref")) {
      cachingFunc2.cacheID = _scrollers.cache;
      cachingFunc2.v = f();
    }
    return cachingFunc2.v + cachingFunc2.offset;
  };
  cachingFunc.offset = 0;
  return f && cachingFunc;
}, _horizontal = {
  s: _scrollLeft,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: _scrollCacheFunc(function(value) {
    return arguments.length ? _win$1.scrollTo(value, _vertical.sc()) : _win$1.pageXOffset || _doc$1[_scrollLeft] || _docEl$1[_scrollLeft] || _body$1[_scrollLeft] || 0;
  })
}, _vertical = {
  s: _scrollTop,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: _horizontal,
  sc: _scrollCacheFunc(function(value) {
    return arguments.length ? _win$1.scrollTo(_horizontal.sc(), value) : _win$1.pageYOffset || _doc$1[_scrollTop] || _docEl$1[_scrollTop] || _body$1[_scrollTop] || 0;
  })
}, _getTarget = function _getTarget2(t, self) {
  return (self && self._ctx && self._ctx.selector || gsap$1.utils.toArray)(t)[0] || (typeof t === "string" && gsap$1.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
}, _isWithin = function _isWithin2(element, list) {
  var i = list.length;
  while (i--) {
    if (list[i] === element || list[i].contains(element)) {
      return true;
    }
  }
  return false;
}, _getScrollFunc = function _getScrollFunc2(element, _ref) {
  var s = _ref.s, sc = _ref.sc;
  _isViewport$1(element) && (element = _doc$1.scrollingElement || _docEl$1);
  var i = _scrollers.indexOf(element), offset = sc === _vertical.sc ? 1 : 2;
  !~i && (i = _scrollers.push(element) - 1);
  _scrollers[i + offset] || _addListener$1(element, "scroll", _onScroll$1);
  var prev = _scrollers[i + offset], func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport$1(element) ? sc : _scrollCacheFunc(function(value) {
    return arguments.length ? element[s] = value : element[s];
  })));
  func.target = element;
  prev || (func.smooth = gsap$1.getProperty(element, "scrollBehavior") === "smooth");
  return func;
}, _getVelocityProp = function _getVelocityProp2(value, minTimeRefresh, useDelta) {
  var v1 = value, v2 = value, t1 = _getTime$1(), t2 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, min * 3), update = function update2(value2, force) {
    var t = _getTime$1();
    if (force || t - t1 > min) {
      v2 = v1;
      v1 = value2;
      t2 = t1;
      t1 = t;
    } else if (useDelta) {
      v1 += value2;
    } else {
      v1 = v2 + (value2 - v2) / (t - t2) * (t1 - t2);
    }
  }, reset = function reset2() {
    v2 = v1 = useDelta ? 0 : v1;
    t2 = t1 = 0;
  }, getVelocity = function getVelocity2(latestValue) {
    var tOld = t2, vOld = v2, t = _getTime$1();
    (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
    return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1e3;
  };
  return {
    update,
    reset,
    getVelocity
  };
}, _getEvent = function _getEvent2(e, preventDefault) {
  preventDefault && !e._gsapAllow && e.preventDefault();
  return e.changedTouches ? e.changedTouches[0] : e;
}, _getAbsoluteMax = function _getAbsoluteMax2(a) {
  var max = Math.max.apply(Math, a), min = Math.min.apply(Math, a);
  return Math.abs(max) >= Math.abs(min) ? max : min;
}, _setScrollTrigger = function _setScrollTrigger2() {
  ScrollTrigger$1 = gsap$1.core.globals().ScrollTrigger;
  ScrollTrigger$1 && ScrollTrigger$1.core && _integrate();
}, _initCore2 = function _initCore3(core) {
  gsap$1 = core || _getGSAP$1();
  if (!_coreInitted$1 && gsap$1 && typeof document !== "undefined" && document.body) {
    _win$1 = window;
    _doc$1 = document;
    _docEl$1 = _doc$1.documentElement;
    _body$1 = _doc$1.body;
    _root$1 = [_win$1, _doc$1, _docEl$1, _body$1];
    gsap$1.utils.clamp;
    _context$1 = gsap$1.core.context || function() {
    };
    _pointerType = "onpointerenter" in _body$1 ? "pointer" : "mouse";
    _isTouch = Observer.isTouch = _win$1.matchMedia && _win$1.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win$1 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
    _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl$1 ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl$1) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
    setTimeout(function() {
      return _startup$1 = 0;
    }, 500);
    _setScrollTrigger();
    _coreInitted$1 = 1;
  }
  return _coreInitted$1;
};
_horizontal.op = _vertical;
_scrollers.cache = 0;
var Observer = /* @__PURE__ */ (function() {
  function Observer2(vars) {
    this.init(vars);
  }
  var _proto = Observer2.prototype;
  _proto.init = function init4(vars) {
    _coreInitted$1 || _initCore2(gsap$1) || console.warn("Please gsap.registerPlugin(Observer)");
    ScrollTrigger$1 || _setScrollTrigger();
    var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
    this.target = target = _getTarget(target) || _docEl$1;
    this.vars = vars;
    ignore && (ignore = gsap$1.utils.toArray(ignore));
    tolerance = tolerance || 1e-9;
    dragMinimum = dragMinimum || 0;
    wheelSpeed = wheelSpeed || 1;
    scrollSpeed = scrollSpeed || 1;
    type = type || "wheel,touch,pointer";
    debounce = debounce !== false;
    lineHeight || (lineHeight = parseFloat(_win$1.getComputedStyle(_body$1).lineHeight) || 22);
    var id, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self = this, prevDeltaX = 0, prevDeltaY = 0, passive = vars.passive || !preventDefault && vars.passive !== false, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown", isViewport = _isViewport$1(target), ownerDoc = target.ownerDocument || _doc$1, deltaX = [0, 0, 0], deltaY = [0, 0, 0], onClickTime = 0, clickCapture = function clickCapture2() {
      return onClickTime = _getTime$1();
    }, _ignoreCheck = function _ignoreCheck2(e, isPointerOrTouch) {
      return (self.event = e) && ignore && _isWithin(e.target, ignore) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
    }, onStopFunc = function onStopFunc2() {
      self._vx.reset();
      self._vy.reset();
      onStopDelayedCall.pause();
      onStop && onStop(self);
    }, update = function update2() {
      var dx = self.deltaX = _getAbsoluteMax(deltaX), dy = self.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
      onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
      if (changedX) {
        onRight && self.deltaX > 0 && onRight(self);
        onLeft && self.deltaX < 0 && onLeft(self);
        onChangeX && onChangeX(self);
        onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
        prevDeltaX = self.deltaX;
        deltaX[0] = deltaX[1] = deltaX[2] = 0;
      }
      if (changedY) {
        onDown && self.deltaY > 0 && onDown(self);
        onUp && self.deltaY < 0 && onUp(self);
        onChangeY && onChangeY(self);
        onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
        prevDeltaY = self.deltaY;
        deltaY[0] = deltaY[1] = deltaY[2] = 0;
      }
      if (moved || dragged) {
        onMove && onMove(self);
        if (dragged) {
          onDragStart && dragged === 1 && onDragStart(self);
          onDrag && onDrag(self);
          dragged = 0;
        }
        moved = false;
      }
      locked && !(locked = false) && onLockAxis && onLockAxis(self);
      if (wheeled) {
        onWheel(self);
        wheeled = false;
      }
      id = 0;
    }, onDelta = function onDelta2(x, y, index) {
      deltaX[index] += x;
      deltaY[index] += y;
      self._vx.update(x);
      self._vy.update(y);
      debounce ? id || (id = requestAnimationFrame(update)) : update();
    }, onTouchOrPointerDelta = function onTouchOrPointerDelta2(x, y) {
      if (lockAxis && !axis) {
        self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
        locked = true;
      }
      if (axis !== "y") {
        deltaX[2] += x;
        self._vx.update(x, true);
      }
      if (axis !== "x") {
        deltaY[2] += y;
        self._vy.update(y, true);
      }
      debounce ? id || (id = requestAnimationFrame(update)) : update();
    }, _onDrag = function _onDrag2(e) {
      if (_ignoreCheck(e, 1)) {
        return;
      }
      e = _getEvent(e, preventDefault);
      var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y, isDragging = self.isDragging;
      self.x = x;
      self.y = y;
      if (isDragging || (dx || dy) && (Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum)) {
        dragged || (dragged = isDragging ? 2 : 1);
        isDragging || (self.isDragging = true);
        onTouchOrPointerDelta(dx, dy);
      }
    }, _onPress = self.onPress = function(e) {
      if (_ignoreCheck(e, 1) || e && e.button) {
        return;
      }
      self.axis = axis = null;
      onStopDelayedCall.pause();
      self.isPressed = true;
      e = _getEvent(e);
      prevDeltaX = prevDeltaY = 0;
      self.startX = self.x = e.clientX;
      self.startY = self.y = e.clientY;
      self._vx.reset();
      self._vy.reset();
      _addListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
      self.deltaX = self.deltaY = 0;
      onPress && onPress(self);
    }, _onRelease = self.onRelease = function(e) {
      if (_ignoreCheck(e, 1)) {
        return;
      }
      _removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
      var isTrackingDrag = !isNaN(self.y - self.startY), wasDragging = self.isDragging, isDragNotClick = wasDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3), eventData = _getEvent(e);
      if (!isDragNotClick && isTrackingDrag) {
        self._vx.reset();
        self._vy.reset();
        if (preventDefault && allowClicks) {
          gsap$1.delayedCall(0.08, function() {
            if (_getTime$1() - onClickTime > 300 && !e.defaultPrevented) {
              if (e.target.click) {
                e.target.click();
              } else if (ownerDoc.createEvent) {
                var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, _win$1, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                e.target.dispatchEvent(syntheticEvent);
              }
            }
          });
        }
      }
      self.isDragging = self.isGesturing = self.isPressed = false;
      onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
      dragged && update();
      onDragEnd && wasDragging && onDragEnd(self);
      onRelease && onRelease(self, isDragNotClick);
    }, _onGestureStart = function _onGestureStart2(e) {
      return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
    }, _onGestureEnd = function _onGestureEnd2() {
      return (self.isGesturing = false) || onGestureEnd(self);
    }, onScroll = function onScroll2(e) {
      if (_ignoreCheck(e)) {
        return;
      }
      var x = scrollFuncX(), y = scrollFuncY();
      onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
      scrollX = x;
      scrollY = y;
      onStop && onStopDelayedCall.restart(true);
    }, _onWheel = function _onWheel2(e) {
      if (_ignoreCheck(e)) {
        return;
      }
      e = _getEvent(e, preventDefault);
      onWheel && (wheeled = true);
      var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win$1.innerHeight : 1) * wheelSpeed;
      onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
      onStop && !isNormalizer && onStopDelayedCall.restart(true);
    }, _onMove = function _onMove2(e) {
      if (_ignoreCheck(e)) {
        return;
      }
      var x = e.clientX, y = e.clientY, dx = x - self.x, dy = y - self.y;
      self.x = x;
      self.y = y;
      moved = true;
      onStop && onStopDelayedCall.restart(true);
      (dx || dy) && onTouchOrPointerDelta(dx, dy);
    }, _onHover = function _onHover2(e) {
      self.event = e;
      onHover(self);
    }, _onHoverEnd = function _onHoverEnd2(e) {
      self.event = e;
      onHoverEnd(self);
    }, _onClick = function _onClick2(e) {
      return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
    };
    onStopDelayedCall = self._dc = gsap$1.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
    self.deltaX = self.deltaY = 0;
    self._vx = _getVelocityProp(0, 50, true);
    self._vy = _getVelocityProp(0, 50, true);
    self.scrollX = scrollFuncX;
    self.scrollY = scrollFuncY;
    self.isDragging = self.isGesturing = self.isPressed = false;
    _context$1(this);
    self.enable = function(e) {
      if (!self.isEnabled) {
        _addListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);
        type.indexOf("scroll") >= 0 && _addListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, passive, capture);
        type.indexOf("wheel") >= 0 && _addListener$1(target, "wheel", _onWheel, passive, capture);
        if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
          _addListener$1(target, _eventTypes[0], _onPress, passive, capture);
          _addListener$1(ownerDoc, _eventTypes[2], _onRelease);
          _addListener$1(ownerDoc, _eventTypes[3], _onRelease);
          allowClicks && _addListener$1(target, "click", clickCapture, true, true);
          onClick && _addListener$1(target, "click", _onClick);
          onGestureStart && _addListener$1(ownerDoc, "gesturestart", _onGestureStart);
          onGestureEnd && _addListener$1(ownerDoc, "gestureend", _onGestureEnd);
          onHover && _addListener$1(target, _pointerType + "enter", _onHover);
          onHoverEnd && _addListener$1(target, _pointerType + "leave", _onHoverEnd);
          onMove && _addListener$1(target, _pointerType + "move", _onMove);
        }
        self.isEnabled = true;
        self.isDragging = self.isGesturing = self.isPressed = moved = dragged = false;
        self._vx.reset();
        self._vy.reset();
        scrollX = scrollFuncX();
        scrollY = scrollFuncY();
        e && e.type && _onPress(e);
        onEnable && onEnable(self);
      }
      return self;
    };
    self.disable = function() {
      if (self.isEnabled) {
        _observers.filter(function(o) {
          return o !== self && _isViewport$1(o.target);
        }).length || _removeListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);
        if (self.isPressed) {
          self._vx.reset();
          self._vy.reset();
          _removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
        }
        _removeListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
        _removeListener$1(target, "wheel", _onWheel, capture);
        _removeListener$1(target, _eventTypes[0], _onPress, capture);
        _removeListener$1(ownerDoc, _eventTypes[2], _onRelease);
        _removeListener$1(ownerDoc, _eventTypes[3], _onRelease);
        _removeListener$1(target, "click", clickCapture, true);
        _removeListener$1(target, "click", _onClick);
        _removeListener$1(ownerDoc, "gesturestart", _onGestureStart);
        _removeListener$1(ownerDoc, "gestureend", _onGestureEnd);
        _removeListener$1(target, _pointerType + "enter", _onHover);
        _removeListener$1(target, _pointerType + "leave", _onHoverEnd);
        _removeListener$1(target, _pointerType + "move", _onMove);
        self.isEnabled = self.isPressed = self.isDragging = false;
        onDisable && onDisable(self);
      }
    };
    self.kill = self.revert = function() {
      self.disable();
      var i = _observers.indexOf(self);
      i >= 0 && _observers.splice(i, 1);
      _normalizer$1 === self && (_normalizer$1 = 0);
    };
    _observers.push(self);
    isNormalizer && _isViewport$1(target) && (_normalizer$1 = self);
    self.enable(event);
  };
  _createClass(Observer2, [{
    key: "velocityX",
    get: function get() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function get() {
      return this._vy.getVelocity();
    }
  }]);
  return Observer2;
})();
Observer.version = "3.14.2";
Observer.create = function(vars) {
  return new Observer(vars);
};
Observer.register = _initCore2;
Observer.getAll = function() {
  return _observers.slice();
};
Observer.getById = function(id) {
  return _observers.filter(function(o) {
    return o.vars.id === id;
  })[0];
};
_getGSAP$1() && gsap$1.registerPlugin(Observer);
var gsap, _coreInitted, _win, _doc, _docEl, _body, _root, _resizeDelay, _toArray, _clamp2, _time2, _syncInterval, _refreshing, _pointerIsDown, _transformProp, _i, _prevWidth, _prevHeight, _autoRefresh, _sort, _suppressOverwrites, _ignoreResize, _normalizer, _ignoreMobileResize, _baseScreenHeight, _baseScreenWidth, _fixIOSBug, _context, _scrollRestoration, _div100vh, _100vh, _isReverted, _clampingMax, _limitCallbacks, _startup = 1, _getTime = Date.now, _time1 = _getTime(), _lastScrollTime = 0, _enabled = 0, _parseClamp = function _parseClamp2(value, type, self) {
  var clamp3 = _isString2(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
  self["_" + type + "Clamp"] = clamp3;
  return clamp3 ? value.substr(6, value.length - 7) : value;
}, _keepClamp = function _keepClamp2(value, clamp3) {
  return clamp3 && (!_isString2(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
}, _rafBugFix = function _rafBugFix2() {
  return _enabled && requestAnimationFrame(_rafBugFix2);
}, _pointerDownHandler = function _pointerDownHandler2() {
  return _pointerIsDown = 1;
}, _pointerUpHandler = function _pointerUpHandler2() {
  return _pointerIsDown = 0;
}, _passThrough2 = function _passThrough3(v) {
  return v;
}, _round2 = function _round3(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
}, _windowExists3 = function _windowExists4() {
  return typeof window !== "undefined";
}, _getGSAP2 = function _getGSAP3() {
  return gsap || _windowExists3() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
}, _isViewport2 = function _isViewport3(e) {
  return !!~_root.indexOf(e);
}, _getViewportDimension = function _getViewportDimension2(dimensionProperty) {
  return (dimensionProperty === "Height" ? _100vh : _win["inner" + dimensionProperty]) || _docEl["client" + dimensionProperty] || _body["client" + dimensionProperty];
}, _getBoundsFunc = function _getBoundsFunc2(element) {
  return _getProxyProp(element, "getBoundingClientRect") || (_isViewport2(element) ? function() {
    _winOffsets.width = _win.innerWidth;
    _winOffsets.height = _100vh;
    return _winOffsets;
  } : function() {
    return _getBounds(element);
  });
}, _getSizeFunc = function _getSizeFunc2(scroller, isViewport, _ref) {
  var d = _ref.d, d2 = _ref.d2, a = _ref.a;
  return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
    return a()[d];
  } : function() {
    return (isViewport ? _getViewportDimension(d2) : scroller["client" + d2]) || 0;
  };
}, _getOffsetsFunc = function _getOffsetsFunc2(element, isViewport) {
  return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
    return _winOffsets;
  };
}, _maxScroll = function _maxScroll2(element, _ref2) {
  var s = _ref2.s, d2 = _ref2.d2, d = _ref2.d, a = _ref2.a;
  return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport2(element) ? (_docEl[s] || _body[s]) - _getViewportDimension(d2) : element[s] - element["offset" + d2]);
}, _iterateAutoRefresh = function _iterateAutoRefresh2(func, events) {
  for (var i = 0; i < _autoRefresh.length; i += 3) {
    (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
  }
}, _isString2 = function _isString3(value) {
  return typeof value === "string";
}, _isFunction2 = function _isFunction3(value) {
  return typeof value === "function";
}, _isNumber2 = function _isNumber3(value) {
  return typeof value === "number";
}, _isObject2 = function _isObject3(value) {
  return typeof value === "object";
}, _endAnimation = function _endAnimation2(animation, reversed, pause) {
  return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
}, _callback2 = function _callback3(self, func) {
  if (self.enabled) {
    var result = self._ctx ? self._ctx.add(function() {
      return func(self);
    }) : func(self);
    result && result.totalTime && (self.callbackAnimation = result);
  }
}, _abs = Math.abs, _left = "left", _top = "top", _right = "right", _bottom = "bottom", _width = "width", _height = "height", _Right = "Right", _Left = "Left", _Top = "Top", _Bottom = "Bottom", _padding = "padding", _margin = "margin", _Width = "Width", _Height = "Height", _px = "px", _getComputedStyle = function _getComputedStyle2(element) {
  return _win.getComputedStyle(element);
}, _makePositionable = function _makePositionable2(element) {
  var position = _getComputedStyle(element).position;
  element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
}, _setDefaults2 = function _setDefaults3(obj, defaults2) {
  for (var p in defaults2) {
    p in obj || (obj[p] = defaults2[p]);
  }
  return obj;
}, _getBounds = function _getBounds2(element, withoutTransforms) {
  var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap.to(element, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), bounds = element.getBoundingClientRect();
  tween && tween.progress(0).kill();
  return bounds;
}, _getSize = function _getSize2(element, _ref3) {
  var d2 = _ref3.d2;
  return element["offset" + d2] || element["client" + d2] || 0;
}, _getLabelRatioArray = function _getLabelRatioArray2(timeline2) {
  var a = [], labels = timeline2.labels, duration = timeline2.duration(), p;
  for (p in labels) {
    a.push(labels[p] / duration);
  }
  return a;
}, _getClosestLabel = function _getClosestLabel2(animation) {
  return function(value) {
    return gsap.utils.snap(_getLabelRatioArray(animation), value);
  };
}, _snapDirectional = function _snapDirectional2(snapIncrementOrArray) {
  var snap3 = gsap.utils.snap(snapIncrementOrArray), a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a2, b) {
    return a2 - b;
  });
  return a ? function(value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }
    var i;
    if (!direction) {
      return snap3(value);
    }
    if (direction > 0) {
      value -= threshold;
      for (i = 0; i < a.length; i++) {
        if (a[i] >= value) {
          return a[i];
        }
      }
      return a[i - 1];
    } else {
      i = a.length;
      value += threshold;
      while (i--) {
        if (a[i] <= value) {
          return a[i];
        }
      }
    }
    return a[0];
  } : function(value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }
    var snapped = snap3(value);
    return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap3(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
  };
}, _getLabelAtDirection = function _getLabelAtDirection2(timeline2) {
  return function(value, st) {
    return _snapDirectional(_getLabelRatioArray(timeline2))(value, st.direction);
  };
}, _multiListener = function _multiListener2(func, element, types, callback) {
  return types.split(",").forEach(function(type) {
    return func(element, type, callback);
  });
}, _addListener2 = function _addListener3(element, type, func, nonPassive, capture) {
  return element.addEventListener(type, func, {
    passive: !nonPassive,
    capture: !!capture
  });
}, _removeListener2 = function _removeListener3(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
}, _wheelListener = function _wheelListener2(func, el, scrollFunc) {
  scrollFunc = scrollFunc && scrollFunc.wheelHandler;
  if (scrollFunc) {
    func(el, "wheel", scrollFunc);
    func(el, "touchmove", scrollFunc);
  }
}, _markerDefaults = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, _defaults = {
  toggleActions: "play",
  anticipatePin: 0
}, _keywords = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, _offsetToPx = function _offsetToPx2(value, size) {
  if (_isString2(value)) {
    var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
    if (~eqIndex) {
      value.indexOf("%") > eqIndex && (relative *= size / 100);
      value = value.substr(0, eqIndex - 1);
    }
    value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
  }
  return value;
}, _createMarker = function _createMarker2(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
  var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
  var e = _doc.createElement("div"), useFixedPosition = _isViewport2(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
  (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
  matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
  e._isStart = isStart;
  e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
  e.style.cssText = css;
  e.innerText = name || name === 0 ? type + "-" + name : type;
  parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
  e._offset = e["offset" + direction.op.d2];
  _positionMarker(e, 0, direction, isStart);
  return e;
}, _positionMarker = function _positionMarker2(marker, start, direction, flipped) {
  var vars = {
    display: "block"
  }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
  marker._isFlipped = flipped;
  vars[direction.a + "Percent"] = flipped ? -100 : 0;
  vars[direction.a] = flipped ? "1px" : 0;
  vars["border" + side + _Width] = 1;
  vars["border" + oppositeSide + _Width] = 0;
  vars[direction.p] = start + "px";
  gsap.set(marker, vars);
}, _triggers = [], _ids = {}, _rafID, _sync = function _sync2() {
  return _getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
}, _onScroll2 = function _onScroll3() {
  if (!_normalizer || !_normalizer.isPressed || _normalizer.startX > _body.clientWidth) {
    _scrollers.cache++;
    if (_normalizer) {
      _rafID || (_rafID = requestAnimationFrame(_updateAll));
    } else {
      _updateAll();
    }
    _lastScrollTime || _dispatch2("scrollStart");
    _lastScrollTime = _getTime();
  }
}, _setBaseDimensions = function _setBaseDimensions2() {
  _baseScreenWidth = _win.innerWidth;
  _baseScreenHeight = _win.innerHeight;
}, _onResize = function _onResize2(force) {
  _scrollers.cache++;
  (force === true || !_refreshing && !_ignoreResize && !_doc.fullscreenElement && !_doc.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win.innerWidth || Math.abs(_win.innerHeight - _baseScreenHeight) > _win.innerHeight * 0.25)) && _resizeDelay.restart(true);
}, _listeners = {}, _emptyArray = [], _softRefresh = function _softRefresh2() {
  return _removeListener2(ScrollTrigger, "scrollEnd", _softRefresh2) || _refreshAll(true);
}, _dispatch2 = function _dispatch3(type) {
  return _listeners[type] && _listeners[type].map(function(f) {
    return f();
  }) || _emptyArray;
}, _savedStyles = [], _revertRecorded = function _revertRecorded2(media) {
  for (var i = 0; i < _savedStyles.length; i += 5) {
    if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
      _savedStyles[i].style.cssText = _savedStyles[i + 1];
      _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
      _savedStyles[i + 3].uncache = 1;
    }
  }
}, _recordScrollPositions = function _recordScrollPositions2() {
  return _scrollers.forEach(function(obj) {
    return _isFunction2(obj) && ++obj.cacheID && (obj.rec = obj());
  });
}, _revertAll = function _revertAll2(kill, media) {
  var trigger;
  for (_i = 0; _i < _triggers.length; _i++) {
    trigger = _triggers[_i];
    if (trigger && (!media || trigger._ctx === media)) {
      if (kill) {
        trigger.kill(1);
      } else {
        trigger.revert(true, true);
      }
    }
  }
  _isReverted = true;
  media && _revertRecorded(media);
  media || _dispatch2("revert");
}, _clearScrollMemory = function _clearScrollMemory2(scrollRestoration, force) {
  _scrollers.cache++;
  (force || !_refreshingAll) && _scrollers.forEach(function(obj) {
    return _isFunction2(obj) && obj.cacheID++ && (obj.rec = 0);
  });
  _isString2(scrollRestoration) && (_win.history.scrollRestoration = _scrollRestoration = scrollRestoration);
}, _refreshingAll, _refreshID = 0, _queueRefreshID, _queueRefreshAll = function _queueRefreshAll2() {
  if (_queueRefreshID !== _refreshID) {
    var id = _queueRefreshID = _refreshID;
    requestAnimationFrame(function() {
      return id === _refreshID && _refreshAll(true);
    });
  }
}, _refresh100vh = function _refresh100vh2() {
  _body.appendChild(_div100vh);
  _100vh = !_normalizer && _div100vh.offsetHeight || _win.innerHeight;
  _body.removeChild(_div100vh);
}, _hideAllMarkers = function _hideAllMarkers2(hide) {
  return _toArray(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(el) {
    return el.style.display = hide ? "none" : "block";
  });
}, _refreshAll = function _refreshAll2(force, skipRevert) {
  _docEl = _doc.documentElement;
  _body = _doc.body;
  _root = [_win, _doc, _docEl, _body];
  if (_lastScrollTime && !force && !_isReverted) {
    _addListener2(ScrollTrigger, "scrollEnd", _softRefresh);
    return;
  }
  _refresh100vh();
  _refreshingAll = ScrollTrigger.isRefreshing = true;
  _isReverted || _recordScrollPositions();
  var refreshInits = _dispatch2("refreshInit");
  _sort && ScrollTrigger.sort();
  skipRevert || _revertAll();
  _scrollers.forEach(function(obj) {
    if (_isFunction2(obj)) {
      obj.smooth && (obj.target.style.scrollBehavior = "auto");
      obj(0);
    }
  });
  _triggers.slice(0).forEach(function(t) {
    return t.refresh();
  });
  _isReverted = false;
  _triggers.forEach(function(t) {
    if (t._subPinOffset && t.pin) {
      var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t.pin[prop];
      t.revert(true, 1);
      t.adjustPinSpacing(t.pin[prop] - original);
      t.refresh();
    }
  });
  _clampingMax = 1;
  _hideAllMarkers(true);
  _triggers.forEach(function(t) {
    var max = _maxScroll(t.scroller, t._dir), endClamp = t.vars.end === "max" || t._endClamp && t.end > max, startClamp = t._startClamp && t.start >= max;
    (endClamp || startClamp) && t.setPositions(startClamp ? max - 1 : t.start, endClamp ? Math.max(startClamp ? max : t.start + 1, max) : t.end, true);
  });
  _hideAllMarkers(false);
  _clampingMax = 0;
  refreshInits.forEach(function(result) {
    return result && result.render && result.render(-1);
  });
  _scrollers.forEach(function(obj) {
    if (_isFunction2(obj)) {
      obj.smooth && requestAnimationFrame(function() {
        return obj.target.style.scrollBehavior = "smooth";
      });
      obj.rec && obj(obj.rec);
    }
  });
  _clearScrollMemory(_scrollRestoration, 1);
  _resizeDelay.pause();
  _refreshID++;
  _refreshingAll = 2;
  _updateAll(2);
  _triggers.forEach(function(t) {
    return _isFunction2(t.vars.onRefresh) && t.vars.onRefresh(t);
  });
  _refreshingAll = ScrollTrigger.isRefreshing = false;
  _dispatch2("refresh");
}, _lastScroll = 0, _direction = 1, _primary, _updateAll = function _updateAll2(force) {
  if (force === 2 || !_refreshingAll && !_isReverted) {
    ScrollTrigger.isUpdating = true;
    _primary && _primary.update(0);
    var l = _triggers.length, time = _getTime(), recordVelocity = time - _time1 >= 50, scroll = l && _triggers[0].scroll();
    _direction = _lastScroll > scroll ? -1 : 1;
    _refreshingAll || (_lastScroll = scroll);
    if (recordVelocity) {
      if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
        _lastScrollTime = 0;
        _dispatch2("scrollEnd");
      }
      _time2 = _time1;
      _time1 = time;
    }
    if (_direction < 0) {
      _i = l;
      while (_i-- > 0) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
      _direction = 1;
    } else {
      for (_i = 0; _i < l; _i++) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
    }
    ScrollTrigger.isUpdating = false;
  }
  _rafID = 0;
}, _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]), _swapPinOut = function _swapPinOut2(pin, spacer, state) {
  _setState(state);
  var cache = pin._gsap;
  if (cache.spacerIsNative) {
    _setState(cache.spacerState);
  } else if (pin._gsap.swappedIn) {
    var parent = spacer.parentNode;
    if (parent) {
      parent.insertBefore(pin, spacer);
      parent.removeChild(spacer);
    }
  }
  pin._gsap.swappedIn = false;
}, _swapPinIn = function _swapPinIn2(pin, spacer, cs, spacerState) {
  if (!pin._gsap.swappedIn) {
    var i = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p;
    while (i--) {
      p = _propNamesToCopy[i];
      spacerStyle[p] = cs[p];
    }
    spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
    cs.display === "inline" && (spacerStyle.display = "inline-block");
    pinStyle[_bottom] = pinStyle[_right] = "auto";
    spacerStyle.flexBasis = cs.flexBasis || "auto";
    spacerStyle.overflow = "visible";
    spacerStyle.boxSizing = "border-box";
    spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
    spacerStyle[_height] = _getSize(pin, _vertical) + _px;
    spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
    _setState(spacerState);
    pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
    pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
    pinStyle[_padding] = cs[_padding];
    if (pin.parentNode !== spacer) {
      pin.parentNode.insertBefore(spacer, pin);
      spacer.appendChild(pin);
    }
    pin._gsap.swappedIn = true;
  }
}, _capsExp = /([A-Z])/g, _setState = function _setState2(state) {
  if (state) {
    var style = state.t.style, l = state.length, i = 0, p, value;
    (state.t._gsap || gsap.core.getCache(state.t)).uncache = 1;
    for (; i < l; i += 2) {
      value = state[i + 1];
      p = state[i];
      if (value) {
        style[p] = value;
      } else if (style[p]) {
        style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
      }
    }
  }
}, _getState = function _getState2(element) {
  var l = _stateProps.length, style = element.style, state = [], i = 0;
  for (; i < l; i++) {
    state.push(_stateProps[i], style[_stateProps[i]]);
  }
  state.t = element;
  return state;
}, _copyState = function _copyState2(state, override, omitOffsets) {
  var result = [], l = state.length, i = omitOffsets ? 8 : 0, p;
  for (; i < l; i += 2) {
    p = state[i];
    result.push(p, p in override ? override[p] : state[i + 1]);
  }
  result.t = state.t;
  return result;
}, _winOffsets = {
  left: 0,
  top: 0
}, _parsePosition2 = function _parsePosition3(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
  _isFunction2(value) && (value = value(self));
  if (_isString2(value) && value.substr(0, 3) === "max") {
    value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
  }
  var time = containerAnimation ? containerAnimation.time() : 0, p1, p2, element;
  containerAnimation && containerAnimation.seek(0);
  isNaN(value) || (value = +value);
  if (!_isNumber2(value)) {
    _isFunction2(trigger) && (trigger = trigger(self));
    var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
    element = _getTarget(trigger, self) || _body;
    bounds = _getBounds(element) || {};
    if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
      display = element.style.display;
      element.style.display = "block";
      bounds = _getBounds(element);
      display ? element.style.display = display : element.style.removeProperty("display");
    }
    localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
    globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
    value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
    markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
    scrollerSize -= scrollerSize - globalOffset;
  } else {
    containerAnimation && (value = gsap.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
    markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
  }
  if (clampZeroProp) {
    self[clampZeroProp] = value || -1e-3;
    value < 0 && (value = 0);
  }
  if (marker) {
    var position = value + scrollerSize, isStart = marker._isStart;
    p1 = "scroll" + direction.d2;
    _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body[p1], _docEl[p1]) : marker.parentNode[p1]) <= position + 1);
    if (useFixedPosition) {
      scrollerBounds = _getBounds(markerScroller);
      useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
    }
  }
  if (containerAnimation && element) {
    p1 = _getBounds(element);
    containerAnimation.seek(scrollerMax);
    p2 = _getBounds(element);
    containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
    value = value / containerAnimation._caScrollDist * scrollerMax;
  }
  containerAnimation && containerAnimation.seek(time);
  return containerAnimation ? value : Math.round(value);
}, _prefixExp = /(webkit|moz|length|cssText|inset)/i, _reparent = function _reparent2(element, parent, top, left) {
  if (element.parentNode !== parent) {
    var style = element.style, p, cs;
    if (parent === _body) {
      element._stOrig = style.cssText;
      cs = _getComputedStyle(element);
      for (p in cs) {
        if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
          style[p] = cs[p];
        }
      }
      style.top = top;
      style.left = left;
    } else {
      style.cssText = element._stOrig;
    }
    gsap.core.getCache(element).uncache = 1;
    parent.appendChild(element);
  }
}, _interruptionTracker = function _interruptionTracker2(getValueFunc, initialValue, onInterrupt) {
  var last1 = initialValue, last2 = last1;
  return function(value) {
    var current = Math.round(getValueFunc());
    if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
      value = current;
      onInterrupt && onInterrupt();
    }
    last2 = last1;
    last1 = Math.round(value);
    return last1;
  };
}, _shiftMarker = function _shiftMarker2(marker, direction, value) {
  var vars = {};
  vars[direction.p] = "+=" + value;
  gsap.set(marker, vars);
}, _getTweenCreator = function _getTweenCreator2(scroller, direction) {
  var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween2(scrollTo, vars, initialValue, change1, change2) {
    var tween = getTween2.tween, onComplete = vars.onComplete, modifiers = {};
    initialValue = initialValue || getScroll();
    var checkForInterruption = _interruptionTracker(getScroll, initialValue, function() {
      tween.kill();
      getTween2.tween = 0;
    });
    change2 = change1 && change2 || 0;
    change1 = change1 || scrollTo - initialValue;
    tween && tween.kill();
    vars[prop] = scrollTo;
    vars.inherit = false;
    vars.modifiers = modifiers;
    modifiers[prop] = function() {
      return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
    };
    vars.onUpdate = function() {
      _scrollers.cache++;
      getTween2.tween && _updateAll();
    };
    vars.onComplete = function() {
      getTween2.tween = 0;
      onComplete && onComplete.call(tween);
    };
    tween = getTween2.tween = gsap.to(scroller, vars);
    return tween;
  };
  scroller[prop] = getScroll;
  getScroll.wheelHandler = function() {
    return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
  };
  _addListener2(scroller, "wheel", getScroll.wheelHandler);
  ScrollTrigger.isTouch && _addListener2(scroller, "touchmove", getScroll.wheelHandler);
  return getTween;
};
var ScrollTrigger = /* @__PURE__ */ (function() {
  function ScrollTrigger2(vars, animation) {
    _coreInitted || ScrollTrigger2.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
    _context(this);
    this.init(vars, animation);
  }
  var _proto = ScrollTrigger2.prototype;
  _proto.init = function init4(vars, animation) {
    this.progress = this.start = 0;
    this.vars && this.kill(true, true);
    if (!_enabled) {
      this.update = this.refresh = this.kill = _passThrough2;
      return;
    }
    vars = _setDefaults2(_isString2(vars) || _isNumber2(vars) || vars.nodeType ? {
      trigger: vars
    } : vars, _defaults);
    var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap3 = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win), scrollerCache = gsap.core.getCache(scroller), isViewport = _isViewport2(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
      return vars.onRefreshInit(self);
    }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, prevProgress = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, executingOnRefresh, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap22, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
    self._startClamp = self._endClamp = false;
    self._dir = direction;
    anticipatePin *= 45;
    self.scroller = scroller;
    self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
    scroll1 = scrollFunc();
    self.vars = vars;
    animation = animation || vars.animation;
    if ("refreshPriority" in vars) {
      _sort = 1;
      vars.refreshPriority === -9999 && (_primary = self);
    }
    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
      top: _getTweenCreator(scroller, _vertical),
      left: _getTweenCreator(scroller, _horizontal)
    };
    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
    self.scrubDuration = function(value) {
      scrubSmooth = _isNumber2(value) && value;
      if (!scrubSmooth) {
        scrubTween && scrubTween.progress(1).kill();
        scrubTween = 0;
      } else {
        scrubTween ? scrubTween.duration(value) : scrubTween = gsap.to(animation, {
          ease: "expo",
          totalProgress: "+=0",
          inherit: false,
          duration: scrubSmooth,
          paused: true,
          onComplete: function onComplete() {
            return onScrubComplete && onScrubComplete(self);
          }
        });
      }
    };
    if (animation) {
      animation.vars.lazy = false;
      animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
      self.animation = animation.pause();
      animation.scrollTrigger = self;
      self.scrubDuration(scrub);
      snap1 = 0;
      id || (id = animation.vars.id);
    }
    if (snap3) {
      if (!_isObject2(snap3) || snap3.push) {
        snap3 = {
          snapTo: snap3
        };
      }
      "scrollBehavior" in _body.style && gsap.set(isViewport ? [_body, _docEl] : scroller, {
        scrollBehavior: "auto"
      });
      _scrollers.forEach(function(o) {
        return _isFunction2(o) && o.target === (isViewport ? _doc.scrollingElement || _docEl : scroller) && (o.smooth = false);
      });
      snapFunc = _isFunction2(snap3.snapTo) ? snap3.snapTo : snap3.snapTo === "labels" ? _getClosestLabel(animation) : snap3.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap3.directional !== false ? function(value, st) {
        return _snapDirectional(snap3.snapTo)(value, _getTime() - lastRefresh < 500 ? 0 : st.direction);
      } : gsap.utils.snap(snap3.snapTo);
      snapDurClamp = snap3.duration || {
        min: 0.1,
        max: 2
      };
      snapDurClamp = _isObject2(snapDurClamp) ? _clamp2(snapDurClamp.min, snapDurClamp.max) : _clamp2(snapDurClamp, snapDurClamp);
      snapDelayedCall = gsap.delayedCall(snap3.delay || scrubSmooth / 2 || 0.1, function() {
        var scroll = scrollFunc(), refreshedRecently = _getTime() - lastRefresh < 500, tween = tweenTo.tween;
        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
          var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap22) / (_getTime() - _time2) * 1e3 || 0, change1 = gsap.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185), naturalEnd = progress + (snap3.inertia === false ? 0 : change1), endValue, endScroll, _snap = snap3, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
          endValue = snapFunc(naturalEnd, self);
          _isNumber2(endValue) || (endValue = naturalEnd);
          endScroll = Math.max(0, Math.round(start + endValue * change));
          if (scroll <= end && scroll >= start && endScroll !== scroll) {
            if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
              return;
            }
            if (snap3.inertia === false) {
              change1 = endValue - progress;
            }
            tweenTo(endScroll, {
              duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
              ease: snap3.ease || "power3",
              data: _abs(endScroll - scroll),
              // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
              onInterrupt: function onInterrupt() {
                return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
              },
              onComplete: function onComplete() {
                self.update();
                lastSnap = scrollFunc();
                if (animation && !isToggle) {
                  scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
                }
                snap1 = snap22 = animation && !isToggle ? animation.totalProgress() : self.progress;
                onSnapComplete && onSnapComplete(self);
                _onComplete && _onComplete(self);
              }
            }, scroll, change1 * change, endScroll - scroll - change1 * change);
            onStart && onStart(self, tweenTo.tween);
          }
        } else if (self.isActive && lastSnap !== scroll) {
          snapDelayedCall.restart(true);
        }
      }).pause();
    }
    id && (_ids[id] = self);
    trigger = self.trigger = _getTarget(trigger || pin !== true && pin);
    customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
    customRevertReturn && (customRevertReturn = customRevertReturn(self));
    pin = pin === true ? trigger : _getTarget(pin);
    _isString2(toggleClass) && (toggleClass = {
      targets: trigger,
      className: toggleClass
    });
    if (pin) {
      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
      self.pin = pin;
      pinCache = gsap.core.getCache(pin);
      if (!pinCache.spacer) {
        if (pinSpacer) {
          pinSpacer = _getTarget(pinSpacer);
          pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
          pinCache.spacerIsNative = !!pinSpacer;
          pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
        }
        pinCache.spacer = spacer = pinSpacer || _doc.createElement("div");
        spacer.classList.add("pin-spacer");
        id && spacer.classList.add("pin-spacer-" + id);
        pinCache.pinState = pinOriginalState = _getState(pin);
      } else {
        pinOriginalState = pinCache.pinState;
      }
      vars.force3D !== false && gsap.set(pin, {
        force3D: true
      });
      self.spacer = spacer = pinCache.spacer;
      cs = _getComputedStyle(pin);
      spacingStart = cs[pinSpacing + direction.os2];
      pinGetter = gsap.getProperty(pin);
      pinSetter = gsap.quickSetter(pin, direction.a, _px);
      _swapPinIn(pin, spacer, cs);
      pinState = _getState(pin);
    }
    if (markers) {
      markerVars = _isObject2(markers) ? _setDefaults2(markers, _markerDefaults) : _markerDefaults;
      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
      offset = markerStartTrigger["offset" + direction.op.d2];
      var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
      markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
      markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
      containerAnimation && (caMarkerSetter = gsap.quickSetter([markerStart, markerEnd], direction.a, _px));
      if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
        _makePositionable(isViewport ? _body : scroller);
        gsap.set([markerStartTrigger, markerEndTrigger], {
          force3D: true
        });
        markerStartSetter = gsap.quickSetter(markerStartTrigger, direction.a, _px);
        markerEndSetter = gsap.quickSetter(markerEndTrigger, direction.a, _px);
      }
    }
    if (containerAnimation) {
      var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
      containerAnimation.eventCallback("onUpdate", function() {
        self.update(0, 0, 1);
        oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
      });
    }
    self.previous = function() {
      return _triggers[_triggers.indexOf(self) - 1];
    };
    self.next = function() {
      return _triggers[_triggers.indexOf(self) + 1];
    };
    self.revert = function(revert, temp) {
      if (!temp) {
        return self.kill(true);
      }
      var r = revert !== false || !self.enabled, prevRefreshing = _refreshing;
      if (r !== self.isReverted) {
        if (r) {
          prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
          prevProgress = self.progress;
          prevAnimProgress = animation && animation.progress();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
          return m.style.display = r ? "none" : "block";
        });
        if (r) {
          _refreshing = self;
          self.update(r);
        }
        if (pin && (!pinReparent || !self.isActive)) {
          if (r) {
            _swapPinOut(pin, spacer, pinOriginalState);
          } else {
            _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
          }
        }
        r || self.update(r);
        _refreshing = prevRefreshing;
        self.isReverted = r;
      }
    };
    self.refresh = function(soft, force, position, pinOffset) {
      if ((_refreshing || !self.enabled) && !force) {
        return;
      }
      if (pin && soft && _lastScrollTime) {
        _addListener2(ScrollTrigger2, "scrollEnd", _softRefresh);
        return;
      }
      !_refreshingAll && onRefreshInit && onRefreshInit(self);
      _refreshing = self;
      if (tweenTo.tween && !position) {
        tweenTo.tween.kill();
        tweenTo.tween = 0;
      }
      scrubTween && scrubTween.pause();
      if (invalidateOnRefresh && animation) {
        animation.revert({
          kill: false
        }).invalidate();
        animation.getChildren ? animation.getChildren(true, true, false).forEach(function(t) {
          return t.vars.immediateRender && t.render(0, true, true);
        }) : animation.vars.immediateRender && animation.render(0, true, true);
      }
      self.isReverted || self.revert(true, true);
      self._subPinOffset = false;
      var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), isFirstRefresh = change <= 0.01 || !change, offset2 = 0, otherPinOffset = pinOffset || 0, parsedEnd = _isObject2(position) ? position.end : vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = _isObject2(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i = triggerIndex, cs2, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, markerStartOffset, markerEndOffset;
      if (markers && _isObject2(position)) {
        markerStartOffset = gsap.getProperty(markerStartTrigger, direction.p);
        markerEndOffset = gsap.getProperty(markerEndTrigger, direction.p);
      }
      while (i-- > 0) {
        curTrigger = _triggers[i];
        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self);
        curPin = curTrigger.pin;
        if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
          revertedPins || (revertedPins = []);
          revertedPins.unshift(curTrigger);
          curTrigger.revert(true, true);
        }
        if (curTrigger !== _triggers[i]) {
          triggerIndex--;
          i--;
        }
      }
      _isFunction2(parsedStart) && (parsedStart = parsedStart(self));
      parsedStart = _parseClamp(parsedStart, "start", self);
      start = _parsePosition2(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -1e-3 : 0);
      _isFunction2(parsedEnd) && (parsedEnd = parsedEnd(self));
      if (_isString2(parsedEnd) && !parsedEnd.indexOf("+=")) {
        if (~parsedEnd.indexOf(" ")) {
          parsedEnd = (_isString2(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
        } else {
          offset2 = _offsetToPx(parsedEnd.substr(2), size);
          parsedEnd = _isString2(parsedStart) ? parsedStart : (containerAnimation ? gsap.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset2;
          parsedEndTrigger = trigger;
        }
      }
      parsedEnd = _parseClamp(parsedEnd, "end", self);
      end = Math.max(start, _parsePosition2(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset2, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -1e-3;
      offset2 = 0;
      i = triggerIndex;
      while (i--) {
        curTrigger = _triggers[i] || {};
        curPin = curTrigger.pin;
        if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
          cs2 = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
          if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
            offset2 += cs2 * (1 - curTrigger.progress);
          }
          curPin === pin && (otherPinOffset += cs2);
        }
      }
      start += offset2;
      end += offset2;
      self._startClamp && (self._startClamp += offset2);
      if (self._endClamp && !_refreshingAll) {
        self._endClamp = end || -1e-3;
        end = Math.min(end, _maxScroll(scroller, direction));
      }
      change = end - start || (start -= 0.01) && 1e-3;
      if (isFirstRefresh) {
        prevProgress = gsap.utils.clamp(0, 1, gsap.utils.normalize(start, end, prevScroll));
      }
      self._pinPush = otherPinOffset;
      if (markerStart && offset2) {
        cs2 = {};
        cs2[direction.a] = "+=" + offset2;
        pinnedContainer && (cs2[direction.p] = "-=" + scrollFunc());
        gsap.set([markerStart, markerEnd], cs2);
      }
      if (pin && !(_clampingMax && self.end >= _maxScroll(scroller, direction))) {
        cs2 = _getComputedStyle(pin);
        isVertical = direction === _vertical;
        scroll = scrollFunc();
        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
        if (!max && end > 1) {
          forcedOverflow = (isViewport ? _doc.scrollingElement || _docEl : scroller).style;
          forcedOverflow = {
            style: forcedOverflow,
            value: forcedOverflow["overflow" + direction.a.toUpperCase()]
          };
          if (isViewport && _getComputedStyle(_body)["overflow" + direction.a.toUpperCase()] !== "scroll") {
            forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
          }
        }
        _swapPinIn(pin, spacer, cs2);
        pinState = _getState(pin);
        bounds = _getBounds(pin, true);
        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
        if (pinSpacing) {
          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
          spacerState.t = spacer;
          i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
          if (i) {
            spacerState.push(direction.d, i + _px);
            spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
          }
          _setState(spacerState);
          if (pinnedContainer) {
            _triggers.forEach(function(t) {
              if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                t._subPinOffset = true;
              }
            });
          }
          useFixedPosition && scrollFunc(prevScroll);
        } else {
          i = _getSize(pin, direction);
          i && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
        }
        if (useFixedPosition) {
          override = {
            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
            boxSizing: "border-box",
            position: "fixed"
          };
          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
          override[_padding] = cs2[_padding];
          override[_padding + _Top] = cs2[_padding + _Top];
          override[_padding + _Right] = cs2[_padding + _Right];
          override[_padding + _Bottom] = cs2[_padding + _Bottom];
          override[_padding + _Left] = cs2[_padding + _Left];
          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
          _refreshingAll && scrollFunc(0);
        }
        if (animation) {
          initted = animation._initted;
          _suppressOverwrites(1);
          animation.render(animation.duration(), true, true);
          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
          pinMoves = Math.abs(change - pinChange) > 1;
          useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
          animation.render(0, true, true);
          initted || animation.invalidate(true);
          animation.parent || animation.totalTime(animation.totalTime());
          _suppressOverwrites(0);
        } else {
          pinChange = change;
        }
        forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
      } else if (trigger && scrollFunc() && !containerAnimation) {
        bounds = trigger.parentNode;
        while (bounds && bounds !== _body) {
          if (bounds._pinOffset) {
            start -= bounds._pinOffset;
            end -= bounds._pinOffset;
          }
          bounds = bounds.parentNode;
        }
      }
      revertedPins && revertedPins.forEach(function(t) {
        return t.revert(false, true);
      });
      self.start = start;
      self.end = end;
      scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
      if (!containerAnimation && !_refreshingAll) {
        scroll1 < prevScroll && scrollFunc(prevScroll);
        self.scroll.rec = 0;
      }
      self.revert(false, true);
      lastRefresh = _getTime();
      if (snapDelayedCall) {
        lastSnap = -1;
        snapDelayedCall.restart(true);
      }
      _refreshing = 0;
      animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true);
      if (isFirstRefresh || prevProgress !== self.progress || containerAnimation || invalidateOnRefresh || animation && !animation._initted) {
        animation && !isToggle && (animation._initted || prevProgress || animation.vars.immediateRender !== false) && animation.totalProgress(containerAnimation && start < -1e-3 && !prevProgress ? gsap.utils.normalize(start, end, 0) : prevProgress, true);
        self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
      }
      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
      scrubTween && scrubTween.invalidate();
      if (!isNaN(markerStartOffset)) {
        markerStartOffset -= gsap.getProperty(markerStartTrigger, direction.p);
        markerEndOffset -= gsap.getProperty(markerEndTrigger, direction.p);
        _shiftMarker(markerStartTrigger, direction, markerStartOffset);
        _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
        _shiftMarker(markerEndTrigger, direction, markerEndOffset);
        _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
      }
      isFirstRefresh && !_refreshingAll && self.update();
      if (onRefresh && !_refreshingAll && !executingOnRefresh) {
        executingOnRefresh = true;
        onRefresh(self);
        executingOnRefresh = false;
      }
    };
    self.getVelocity = function() {
      return (scrollFunc() - scroll2) / (_getTime() - _time2) * 1e3 || 0;
    };
    self.endAnimation = function() {
      _endAnimation(self.callbackAnimation);
      if (animation) {
        scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
      }
    };
    self.labelToScroll = function(label) {
      return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
    };
    self.getTrailing = function(name) {
      var i = _triggers.indexOf(self), a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
      return (_isString2(name) ? a.filter(function(t) {
        return t.vars.preventOverlaps === name;
      }) : a).filter(function(t) {
        return self.direction > 0 ? t.end <= start : t.start >= end;
      });
    };
    self.update = function(reset, recordVelocity, forceFake) {
      if (containerAnimation && !forceFake && !reset) {
        return;
      }
      var scroll = _refreshingAll === true ? prevScroll : self.scroll(), p = reset ? 0 : (scroll - start) / change, clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0, prevProgress2 = self.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
      if (recordVelocity) {
        scroll2 = scroll1;
        scroll1 = containerAnimation ? scrollFunc() : scroll;
        if (snap3) {
          snap22 = snap1;
          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
        }
      }
      if (anticipatePin && pin && !_refreshing && !_startup && _lastScrollTime) {
        if (!clipped && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin) {
          clipped = 1e-4;
        } else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin) {
          clipped = 0.9999;
        }
      }
      if (clipped !== prevProgress2 && self.enabled) {
        isActive = self.isActive = !!clipped && clipped < 1;
        wasActive = !!prevProgress2 && prevProgress2 < 1;
        toggled = isActive !== wasActive;
        stateChanged = toggled || !!clipped !== !!prevProgress2;
        self.direction = clipped > prevProgress2 ? 1 : -1;
        self.progress = clipped;
        if (stateChanged && !_refreshing) {
          toggleState = clipped && !prevProgress2 ? 0 : clipped === 1 ? 1 : prevProgress2 === 1 ? 2 : 3;
          if (isToggle) {
            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
            isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
          }
        }
        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction2(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function(t) {
          return t.endAnimation();
        }));
        if (!isToggle) {
          if (scrubTween && !_refreshing && !_startup) {
            scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
            if (scrubTween.resetTo) {
              scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
            } else {
              scrubTween.vars.totalProgress = clipped;
              scrubTween.invalidate().restart();
            }
          } else if (animation) {
            animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
          }
        }
        if (pin) {
          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
          if (!useFixedPosition) {
            pinSetter(_round2(pinStart + pinChange * clipped));
          } else if (stateChanged) {
            isAtMax = !reset && clipped > prevProgress2 && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
            if (pinReparent) {
              if (!reset && (isActive || isAtMax)) {
                var bounds = _getBounds(pin, true), _offset = scroll - start;
                _reparent(pin, _body, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
              } else {
                _reparent(pin, spacer);
              }
            }
            _setState(isActive || isAtMax ? pinActiveState : pinState);
            pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
          }
        }
        snap3 && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function(el) {
          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
        });
        onUpdate && !isToggle && !reset && onUpdate(self);
        if (stateChanged && !_refreshing) {
          if (isToggle) {
            if (isTakingAction) {
              if (action === "complete") {
                animation.pause().totalProgress(1);
              } else if (action === "reset") {
                animation.restart(true).pause();
              } else if (action === "restart") {
                animation.restart(true);
              } else {
                animation[action]();
              }
            }
            onUpdate && onUpdate(self);
          }
          if (toggled || !_limitCallbacks) {
            onToggle && toggled && _callback2(self, onToggle);
            callbacks[toggleState] && _callback2(self, callbacks[toggleState]);
            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
            if (!toggled) {
              toggleState = clipped === 1 ? 1 : 3;
              callbacks[toggleState] && _callback2(self, callbacks[toggleState]);
            }
          }
          if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber2(fastScrollEnd) ? fastScrollEnd : 2500)) {
            _endAnimation(self.callbackAnimation);
            scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
          }
        } else if (isToggle && onUpdate && !_refreshing) {
          onUpdate(self);
        }
      }
      if (markerEndSetter) {
        var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
        markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
        markerEndSetter(n);
      }
      caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
    };
    self.enable = function(reset, refresh) {
      if (!self.enabled) {
        self.enabled = true;
        _addListener2(scroller, "resize", _onResize);
        isViewport || _addListener2(scroller, "scroll", _onScroll2);
        onRefreshInit && _addListener2(ScrollTrigger2, "refreshInit", onRefreshInit);
        if (reset !== false) {
          self.progress = prevProgress = 0;
          scroll1 = scroll2 = lastSnap = scrollFunc();
        }
        refresh !== false && self.refresh();
      }
    };
    self.getTween = function(snap4) {
      return snap4 && tweenTo ? tweenTo.tween : scrubTween;
    };
    self.setPositions = function(newStart, newEnd, keepClamp, pinOffset) {
      if (containerAnimation) {
        var st = containerAnimation.scrollTrigger, duration = containerAnimation.duration(), _change = st.end - st.start;
        newStart = st.start + _change * newStart / duration;
        newEnd = st.start + _change * newEnd / duration;
      }
      self.refresh(false, false, {
        start: _keepClamp(newStart, keepClamp && !!self._startClamp),
        end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
      }, pinOffset);
      self.update();
    };
    self.adjustPinSpacing = function(amount) {
      if (spacerState && amount) {
        var i = spacerState.indexOf(direction.d) + 1;
        spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
        spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
        _setState(spacerState);
      }
    };
    self.disable = function(reset, allowAnimation) {
      reset !== false && self.revert(true, true);
      if (self.enabled) {
        self.enabled = self.isActive = false;
        allowAnimation || scrubTween && scrubTween.pause();
        prevScroll = 0;
        pinCache && (pinCache.uncache = 1);
        onRefreshInit && _removeListener2(ScrollTrigger2, "refreshInit", onRefreshInit);
        if (snapDelayedCall) {
          snapDelayedCall.pause();
          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
        }
        if (!isViewport) {
          var i = _triggers.length;
          while (i--) {
            if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
              return;
            }
          }
          _removeListener2(scroller, "resize", _onResize);
          isViewport || _removeListener2(scroller, "scroll", _onScroll2);
        }
      }
    };
    self.kill = function(revert, allowAnimation) {
      self.disable(revert, allowAnimation);
      scrubTween && !allowAnimation && scrubTween.kill();
      id && delete _ids[id];
      var i = _triggers.indexOf(self);
      i >= 0 && _triggers.splice(i, 1);
      i === _i && _direction > 0 && _i--;
      i = 0;
      _triggers.forEach(function(t) {
        return t.scroller === self.scroller && (i = 1);
      });
      i || _refreshingAll || (self.scroll.rec = 0);
      if (animation) {
        animation.scrollTrigger = null;
        revert && animation.revert({
          kill: false
        });
        allowAnimation || animation.kill();
      }
      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m) {
        return m.parentNode && m.parentNode.removeChild(m);
      });
      _primary === self && (_primary = 0);
      if (pin) {
        pinCache && (pinCache.uncache = 1);
        i = 0;
        _triggers.forEach(function(t) {
          return t.pin === pin && i++;
        });
        i || (pinCache.spacer = 0);
      }
      vars.onKill && vars.onKill(self);
    };
    _triggers.push(self);
    self.enable(false, false);
    customRevertReturn && customRevertReturn(self);
    if (animation && animation.add && !change) {
      var updateFunc = self.update;
      self.update = function() {
        self.update = updateFunc;
        _scrollers.cache++;
        start || end || self.refresh();
      };
      gsap.delayedCall(0.01, self.update);
      change = 0.01;
      start = end = 0;
    } else {
      self.refresh();
    }
    pin && _queueRefreshAll();
  };
  ScrollTrigger2.register = function register(core) {
    if (!_coreInitted) {
      gsap = core || _getGSAP2();
      _windowExists3() && window.document && ScrollTrigger2.enable();
      _coreInitted = _enabled;
    }
    return _coreInitted;
  };
  ScrollTrigger2.defaults = function defaults2(config3) {
    if (config3) {
      for (var p in config3) {
        _defaults[p] = config3[p];
      }
    }
    return _defaults;
  };
  ScrollTrigger2.disable = function disable(reset, kill) {
    _enabled = 0;
    _triggers.forEach(function(trigger) {
      return trigger[kill ? "kill" : "disable"](reset);
    });
    _removeListener2(_win, "wheel", _onScroll2);
    _removeListener2(_doc, "scroll", _onScroll2);
    clearInterval(_syncInterval);
    _removeListener2(_doc, "touchcancel", _passThrough2);
    _removeListener2(_body, "touchstart", _passThrough2);
    _multiListener(_removeListener2, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
    _multiListener(_removeListener2, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);
    _resizeDelay.kill();
    _iterateAutoRefresh(_removeListener2);
    for (var i = 0; i < _scrollers.length; i += 3) {
      _wheelListener(_removeListener2, _scrollers[i], _scrollers[i + 1]);
      _wheelListener(_removeListener2, _scrollers[i], _scrollers[i + 2]);
    }
  };
  ScrollTrigger2.enable = function enable() {
    _win = window;
    _doc = document;
    _docEl = _doc.documentElement;
    _body = _doc.body;
    if (gsap) {
      _toArray = gsap.utils.toArray;
      _clamp2 = gsap.utils.clamp;
      _context = gsap.core.context || _passThrough2;
      _suppressOverwrites = gsap.core.suppressOverwrites || _passThrough2;
      _scrollRestoration = _win.history.scrollRestoration || "auto";
      _lastScroll = _win.pageYOffset || 0;
      gsap.core.globals("ScrollTrigger", ScrollTrigger2);
      if (_body) {
        _enabled = 1;
        _div100vh = document.createElement("div");
        _div100vh.style.height = "100vh";
        _div100vh.style.position = "absolute";
        _refresh100vh();
        _rafBugFix();
        Observer.register(gsap);
        ScrollTrigger2.isTouch = Observer.isTouch;
        _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
        _ignoreMobileResize = Observer.isTouch === 1;
        _addListener2(_win, "wheel", _onScroll2);
        _root = [_win, _doc, _docEl, _body];
        if (gsap.matchMedia) {
          ScrollTrigger2.matchMedia = function(vars) {
            var mm = gsap.matchMedia(), p;
            for (p in vars) {
              mm.add(p, vars[p]);
            }
            return mm;
          };
          gsap.addEventListener("matchMediaInit", function() {
            _recordScrollPositions();
            _revertAll();
          });
          gsap.addEventListener("matchMediaRevert", function() {
            return _revertRecorded();
          });
          gsap.addEventListener("matchMedia", function() {
            _refreshAll(0, 1);
            _dispatch2("matchMedia");
          });
          gsap.matchMedia().add("(orientation: portrait)", function() {
            _setBaseDimensions();
            return _setBaseDimensions;
          });
        } else {
          console.warn("Requires GSAP 3.11.0 or later");
        }
        _setBaseDimensions();
        _addListener2(_doc, "scroll", _onScroll2);
        var bodyHasStyle = _body.hasAttribute("style"), bodyStyle = _body.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap.core.Animation.prototype, bounds, i;
        AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
          value: function value() {
            return this.time(-0.01, true);
          }
        });
        bodyStyle.borderTopStyle = "solid";
        bounds = _getBounds(_body);
        _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
        _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
        if (!bodyHasStyle) {
          _body.setAttribute("style", "");
          _body.removeAttribute("style");
        }
        _syncInterval = setInterval(_sync, 250);
        gsap.delayedCall(0.5, function() {
          return _startup = 0;
        });
        _addListener2(_doc, "touchcancel", _passThrough2);
        _addListener2(_body, "touchstart", _passThrough2);
        _multiListener(_addListener2, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
        _multiListener(_addListener2, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);
        _transformProp = gsap.utils.checkPrefix("transform");
        _stateProps.push(_transformProp);
        _coreInitted = _getTime();
        _resizeDelay = gsap.delayedCall(0.2, _refreshAll).pause();
        _autoRefresh = [_doc, "visibilitychange", function() {
          var w = _win.innerWidth, h = _win.innerHeight;
          if (_doc.hidden) {
            _prevWidth = w;
            _prevHeight = h;
          } else if (_prevWidth !== w || _prevHeight !== h) {
            _onResize();
          }
        }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", _refreshAll, _win, "resize", _onResize];
        _iterateAutoRefresh(_addListener2);
        _triggers.forEach(function(trigger) {
          return trigger.enable(0, 1);
        });
        for (i = 0; i < _scrollers.length; i += 3) {
          _wheelListener(_removeListener2, _scrollers[i], _scrollers[i + 1]);
          _wheelListener(_removeListener2, _scrollers[i], _scrollers[i + 2]);
        }
      }
    }
  };
  ScrollTrigger2.config = function config3(vars) {
    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
    var ms = vars.syncInterval;
    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
    "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger2.isTouch === 1 && vars.ignoreMobileResize);
    if ("autoRefreshEvents" in vars) {
      _iterateAutoRefresh(_removeListener2) || _iterateAutoRefresh(_addListener2, vars.autoRefreshEvents || "none");
      _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
    }
  };
  ScrollTrigger2.scrollerProxy = function scrollerProxy(target, vars) {
    var t = _getTarget(target), i = _scrollers.indexOf(t), isViewport = _isViewport2(t);
    if (~i) {
      _scrollers.splice(i, isViewport ? 6 : 2);
    }
    if (vars) {
      isViewport ? _proxies.unshift(_win, vars, _body, vars, _docEl, vars) : _proxies.unshift(t, vars);
    }
  };
  ScrollTrigger2.clearMatchMedia = function clearMatchMedia(query) {
    _triggers.forEach(function(t) {
      return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
    });
  };
  ScrollTrigger2.isInViewport = function isInViewport(element, ratio, horizontal) {
    var bounds = (_isString2(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
    return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win.innerHeight;
  };
  ScrollTrigger2.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
    _isString2(element) && (element = _getTarget(element));
    var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
    return horizontal ? (bounds.left + offset) / _win.innerWidth : (bounds.top + offset) / _win.innerHeight;
  };
  ScrollTrigger2.killAll = function killAll(allowListeners) {
    _triggers.slice(0).forEach(function(t) {
      return t.vars.id !== "ScrollSmoother" && t.kill();
    });
    if (allowListeners !== true) {
      var listeners = _listeners.killAll || [];
      _listeners = {};
      listeners.forEach(function(f) {
        return f();
      });
    }
  };
  return ScrollTrigger2;
})();
ScrollTrigger.version = "3.14.2";
ScrollTrigger.saveStyles = function(targets) {
  return targets ? _toArray(targets).forEach(function(target) {
    if (target && target.style) {
      var i = _savedStyles.indexOf(target);
      i >= 0 && _savedStyles.splice(i, 5);
      _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap.core.getCache(target), _context());
    }
  }) : _savedStyles;
};
ScrollTrigger.revert = function(soft, media) {
  return _revertAll(!soft, media);
};
ScrollTrigger.create = function(vars, animation) {
  return new ScrollTrigger(vars, animation);
};
ScrollTrigger.refresh = function(safe) {
  return safe ? _onResize(true) : (_coreInitted || ScrollTrigger.register()) && _refreshAll(true);
};
ScrollTrigger.update = function(force) {
  return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
};
ScrollTrigger.clearScrollMemory = _clearScrollMemory;
ScrollTrigger.maxScroll = function(element, horizontal) {
  return _maxScroll(element, horizontal ? _horizontal : _vertical);
};
ScrollTrigger.getScrollFunc = function(element, horizontal) {
  return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
};
ScrollTrigger.getById = function(id) {
  return _ids[id];
};
ScrollTrigger.getAll = function() {
  return _triggers.filter(function(t) {
    return t.vars.id !== "ScrollSmoother";
  });
};
ScrollTrigger.isScrolling = function() {
  return !!_lastScrollTime;
};
ScrollTrigger.snapDirectional = _snapDirectional;
ScrollTrigger.addEventListener = function(type, callback) {
  var a = _listeners[type] || (_listeners[type] = []);
  ~a.indexOf(callback) || a.push(callback);
};
ScrollTrigger.removeEventListener = function(type, callback) {
  var a = _listeners[type], i = a && a.indexOf(callback);
  i >= 0 && a.splice(i, 1);
};
ScrollTrigger.batch = function(targets, vars) {
  var result = [], varsCopy = {}, interval = vars.interval || 0.016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback2(type, callback) {
    var elements = [], triggers = [], delay = gsap.delayedCall(interval, function() {
      callback(elements, triggers);
      elements = [];
      triggers = [];
    }).pause();
    return function(self) {
      elements.length || delay.restart(true);
      elements.push(self.trigger);
      triggers.push(self);
      batchMax <= elements.length && delay.progress(1);
    };
  }, p;
  for (p in vars) {
    varsCopy[p] = p.substr(0, 2) === "on" && _isFunction2(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
  }
  if (_isFunction2(batchMax)) {
    batchMax = batchMax();
    _addListener2(ScrollTrigger, "refresh", function() {
      return batchMax = vars.batchMax();
    });
  }
  _toArray(targets).forEach(function(target) {
    var config3 = {};
    for (p in varsCopy) {
      config3[p] = varsCopy[p];
    }
    config3.trigger = target;
    result.push(ScrollTrigger.create(config3));
  });
  return result;
};
var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier2(scrollFunc, current, end, max) {
  current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
  return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
}, _allowNativePanning = function _allowNativePanning2(target, direction) {
  if (direction === true) {
    target.style.removeProperty("touch-action");
  } else {
    target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
  }
  target === _docEl && _allowNativePanning2(_body, direction);
}, _overflow = {
  auto: 1,
  scroll: 1
}, _nestedScroll = function _nestedScroll2(_ref5) {
  var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
  var node = (event.changedTouches ? event.changedTouches[0] : event).target, cache = node._gsap || gsap.core.getCache(node), time = _getTime(), cs;
  if (!cache._isScrollT || time - cache._isScrollT > 2e3) {
    while (node && node !== _body && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
      node = node.parentNode;
    }
    cache._isScroll = node && node !== target && !_isViewport2(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
    cache._isScrollT = time;
  }
  if (cache._isScroll || axis === "x") {
    event.stopPropagation();
    event._gsapAllow = true;
  }
}, _inputObserver = function _inputObserver2(target, type, inputs, nested) {
  return Observer.create({
    target,
    capture: true,
    debounce: false,
    lockAxis: true,
    type,
    onWheel: nested = nested && _nestedScroll,
    onPress: nested,
    onDrag: nested,
    onScroll: nested,
    onEnable: function onEnable() {
      return inputs && _addListener2(_doc, Observer.eventTypes[0], _captureInputs, false, true);
    },
    onDisable: function onDisable() {
      return _removeListener2(_doc, Observer.eventTypes[0], _captureInputs, true);
    }
  });
}, _inputExp = /(input|label|select|textarea)/i, _inputIsFocused, _captureInputs = function _captureInputs2(e) {
  var isInput = _inputExp.test(e.target.tagName);
  if (isInput || _inputIsFocused) {
    e._gsapAllow = true;
    _inputIsFocused = isInput;
  }
}, _getScrollNormalizer = function _getScrollNormalizer2(vars) {
  _isObject2(vars) || (vars = {});
  vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
  vars.type || (vars.type = "wheel,touch");
  vars.debounce = !!vars.debounce;
  vars.id = vars.id || "normalizer";
  var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, onRelease = _vars2.onRelease, self, maxY, target = _getTarget(vars.target) || _docEl, smoother = gsap.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer.isTouch && _win.visualViewport ? _win.visualViewport.scale * _win.visualViewport.width : _win.outerWidth) / _win.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction2(momentum) ? function() {
    return momentum(self);
  } : function() {
    return momentum || 2.8;
  }, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove2() {
    return skipTouchMove = false;
  }, scrollClampX = _passThrough2, scrollClampY = _passThrough2, updateClamps = function updateClamps2() {
    maxY = _maxScroll(target, _vertical);
    scrollClampY = _clamp2(_fixIOSBug ? 1 : 0, maxY);
    normalizeScrollX && (scrollClampX = _clamp2(0, _maxScroll(target, _horizontal)));
    lastRefreshID = _refreshID;
  }, removeContentOffset = function removeContentOffset2() {
    content._gsap.y = _round2(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
    content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
    scrollFuncY.offset = scrollFuncY.cacheID = 0;
  }, ignoreDrag = function ignoreDrag2() {
    if (skipTouchMove) {
      requestAnimationFrame(resumeTouchMove);
      var offset = _round2(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
      if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
        scrollFuncY.offset = scroll - scrollFuncY.v;
        var y = _round2((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
        content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
        content._gsap.y = y + "px";
        scrollFuncY.cacheID = _scrollers.cache;
        _updateAll();
      }
      return true;
    }
    scrollFuncY.offset && removeContentOffset();
    skipTouchMove = true;
  }, tween, startScrollX, startScrollY, onStopDelayedCall, onResize = function onResize2() {
    updateClamps();
    if (tween.isActive() && tween.vars.scrollY > maxY) {
      scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
    }
  };
  content && gsap.set(content, {
    y: "+=0"
  });
  vars.ignoreCheck = function(e) {
    return _fixIOSBug && e.type === "touchmove" && ignoreDrag() || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
  };
  vars.onPress = function() {
    skipTouchMove = false;
    var prevScale = scale;
    scale = _round2((_win.visualViewport && _win.visualViewport.scale || 1) / initialScale);
    tween.pause();
    prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
    startScrollX = scrollFuncX();
    startScrollY = scrollFuncY();
    updateClamps();
    lastRefreshID = _refreshID;
  };
  vars.onRelease = vars.onGestureStart = function(self2, wasDragging) {
    scrollFuncY.offset && removeContentOffset();
    if (!wasDragging) {
      onStopDelayedCall.restart(true);
    } else {
      _scrollers.cache++;
      var dur = resolveMomentumDuration(), currentScroll, endScroll;
      if (normalizeScrollX) {
        currentScroll = scrollFuncX();
        endScroll = currentScroll + dur * 0.05 * -self2.velocityX / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
        tween.vars.scrollX = scrollClampX(endScroll);
      }
      currentScroll = scrollFuncY();
      endScroll = currentScroll + dur * 0.05 * -self2.velocityY / 0.227;
      dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
      tween.vars.scrollY = scrollClampY(endScroll);
      tween.invalidate().duration(dur).play(0.01);
      if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
        gsap.to({}, {
          onUpdate: onResize,
          duration: dur
        });
      }
    }
    onRelease && onRelease(self2);
  };
  vars.onWheel = function() {
    tween._ts && tween.pause();
    if (_getTime() - wheelRefresh > 1e3) {
      lastRefreshID = 0;
      wheelRefresh = _getTime();
    }
  };
  vars.onChange = function(self2, dx, dy, xArray, yArray) {
    _refreshID !== lastRefreshID && updateClamps();
    dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self2.startX - self2.x) : scrollFuncX() + dx - xArray[1]));
    if (dy) {
      scrollFuncY.offset && removeContentOffset();
      var isTouch = yArray[2] === dy, y = isTouch ? startScrollY + self2.startY - self2.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y);
      isTouch && y !== yClamped && (startScrollY += yClamped - y);
      scrollFuncY(yClamped);
    }
    (dy || dx) && _updateAll();
  };
  vars.onEnable = function() {
    _allowNativePanning(target, normalizeScrollX ? false : "x");
    ScrollTrigger.addEventListener("refresh", onResize);
    _addListener2(_win, "resize", onResize);
    if (scrollFuncY.smooth) {
      scrollFuncY.target.style.scrollBehavior = "auto";
      scrollFuncY.smooth = scrollFuncX.smooth = false;
    }
    inputObserver.enable();
  };
  vars.onDisable = function() {
    _allowNativePanning(target, true);
    _removeListener2(_win, "resize", onResize);
    ScrollTrigger.removeEventListener("refresh", onResize);
    inputObserver.kill();
  };
  vars.lockAxis = vars.lockAxis !== false;
  self = new Observer(vars);
  self.iOS = _fixIOSBug;
  _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
  _fixIOSBug && gsap.ticker.add(_passThrough2);
  onStopDelayedCall = self._dc;
  tween = gsap.to(self, {
    ease: "power4",
    paused: true,
    inherit: false,
    scrollX: normalizeScrollX ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function() {
        return tween.pause();
      })
    },
    onUpdate: _updateAll,
    onComplete: onStopDelayedCall.vars.onComplete
  });
  return self;
};
ScrollTrigger.sort = function(func) {
  if (_isFunction2(func)) {
    return _triggers.sort(func);
  }
  var scroll = _win.pageYOffset || 0;
  ScrollTrigger.getAll().forEach(function(t) {
    return t._sortY = t.trigger ? scroll + t.trigger.getBoundingClientRect().top : t.start + _win.innerHeight;
  });
  return _triggers.sort(func || function(a, b) {
    return (a.vars.refreshPriority || 0) * -1e6 + (a.vars.containerAnimation ? 1e6 : a._sortY) - ((b.vars.containerAnimation ? 1e6 : b._sortY) + (b.vars.refreshPriority || 0) * -1e6);
  });
};
ScrollTrigger.observe = function(vars) {
  return new Observer(vars);
};
ScrollTrigger.normalizeScroll = function(vars) {
  if (typeof vars === "undefined") {
    return _normalizer;
  }
  if (vars === true && _normalizer) {
    return _normalizer.enable();
  }
  if (vars === false) {
    _normalizer && _normalizer.kill();
    _normalizer = vars;
    return;
  }
  var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
  _normalizer && _normalizer.target === normalizer.target && _normalizer.kill();
  _isViewport2(normalizer.target) && (_normalizer = normalizer);
  return normalizer;
};
ScrollTrigger.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp,
  _inputObserver,
  _scrollers,
  _proxies,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function ss() {
      _lastScrollTime || _dispatch2("scrollStart");
      _lastScrollTime = _getTime();
    },
    // a way to get the _refreshing value in Observer
    ref: function ref() {
      return _refreshing;
    }
  }
};
_getGSAP2() && gsap.registerPlugin(ScrollTrigger);
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$o({}) {
  return [...generateMeta({
    title: "Aarvitek Systems | High-Performance IT Solutions & Web Development",
    description: "Empowering startups and enterprises with scalable web apps, custom software, and digital branding solutions in India.",
    url: "/"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Aarvitek Systems",
    "url": "https://aarviteksystems.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aarviteksystems.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Aarvitek Systems",
    "image": "https://aarviteksystems.com/images/og-image.png",
    "@id": "https://aarviteksystems.com",
    "url": "https://aarviteksystems.com",
    "telephone": "+91 787 090 1336",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "New Delhi",
      "addressLocality": "New Delhi",
      "addressRegion": "DL",
      "addressCountry": "IN"
    }
  })];
}
const home = UNSAFE_withComponentProps(function Home() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".hero-content > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
    const sections = gsapWithCSS.utils.toArray(".reveal-section");
    sections.forEach((sec) => {
      gsapWithCSS.from(sec, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 85%"
        }
      });
    });
    gsapWithCSS.from(".logo-item", {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".logos-section",
        start: "top 90%"
      }
    });
    gsapWithCSS.from(".process-card", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".process-section",
        start: "top 80%"
      }
    });
    gsapWithCSS.from(".benefit-card", {
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".benefits-section",
        start: "top 80%"
      }
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "flex flex-col min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-purple-600/30 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[100px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 hero-content",
        children: [/* @__PURE__ */ jsx("div", {
          className: "flex justify-center mb-10",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-3",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]",
              children: /* @__PURE__ */ jsx("span", {
                className: "text-white font-black text-2xl",
                children: "A"
              })
            }), /* @__PURE__ */ jsxs("span", {
              className: "text-3xl font-black tracking-tight text-white",
              children: ["Aarvitek ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
                children: "Systems"
              })]
            })]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8",
          children: [/* @__PURE__ */ jsx("span", {
            className: "flex h-2 w-2 rounded-full bg-purple-500"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-sm font-medium text-purple-200 tracking-wide",
            children: "New Digital Transformation Services"
          })]
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1]",
          children: ["Intelligent Automation", /* @__PURE__ */ jsx("br", {}), "for ", /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
            children: "Modern Businesses"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium",
          children: "We specialize in crafting stunning websites, robust e-commerce platforms, and impactful tech solutions that drive growth and engagement."
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row justify-center gap-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/contact",
            className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
            children: "Get in touch"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/web-development",
            className: "px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all",
            children: "View services"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("section", {
      id: "clients",
      className: "py-12 border-y border-white/5 bg-white/[0.02] logos-section reveal-section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-center text-sm text-slate-500 font-semibold tracking-widest uppercase mb-8",
          children: "Trusted by innovative companies worldwide"
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-opacity duration-500",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "Acme Corp"
          }), /* @__PURE__ */ jsx("h3", {
            className: "logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "GlobalTech"
          }), /* @__PURE__ */ jsx("h3", {
            className: "logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "Innovate"
          }), /* @__PURE__ */ jsx("h3", {
            className: "logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "Stark Ind."
          }), /* @__PURE__ */ jsx("h3", {
            className: "logo-item text-2xl font-bold bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent",
            children: "Wayne Ent."
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "services",
      className: "py-24 lg:py-32 relative reveal-section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "Custom Web Development & Tech Solutions"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg max-w-2xl mx-auto",
            children: "Comprehensive IT infrastructure and custom web development services built for scale, performance, and business efficiency."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-24",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex flex-col md:flex-row items-center gap-12 lg:gap-24",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-full md:w-1/2",
              children: /* @__PURE__ */ jsxs("div", {
                className: "aspect-video bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden group",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors z-10"
                }), /* @__PURE__ */ jsx("img", {
                  src: "/images/web-development.png",
                  alt: "Full-Stack Custom Web Development Services",
                  className: "w-full h-full object-cover rounded-[2rem] transform group-hover:scale-105 transition-transform duration-700"
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full md:w-1/2 space-y-6",
              children: [/* @__PURE__ */ jsx("div", {
                className: "inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium",
                children: "Front-End & Back-End"
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-3xl md:text-4xl font-bold text-white",
                children: "Full-Stack Web Development"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-slate-400 text-lg leading-relaxed",
                children: "We build enterprise-grade, highly scalable custom web applications leveraging modern architectures. Performance optimization, clean code, and advanced SEO best practices are at the heart of our engineering process."
              }), /* @__PURE__ */ jsx("ul", {
                className: "space-y-3",
                children: ["React, Next.js & WordPress", "Node.js Microservices", "High Performance & SEO"].map((item, i) => /* @__PURE__ */ jsxs("li", {
                  className: "flex items-center gap-3 text-slate-300",
                  children: [/* @__PURE__ */ jsx("svg", {
                    className: "w-5 h-5 text-purple-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M5 13l4 4L19 7"
                    })
                  }), item]
                }, i))
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-full md:w-1/2",
              children: /* @__PURE__ */ jsxs("div", {
                className: "aspect-video bg-gradient-to-bl from-indigo-900/20 to-transparent border border-indigo-500/20 rounded-[2rem] flex items-center justify-center relative overflow-hidden group",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors z-10"
                }), /* @__PURE__ */ jsx("img", {
                  src: "/images/ui-ux-design.png",
                  alt: "Responsive UI/UX Digital Branding and Design",
                  className: "w-full h-full object-cover rounded-[2rem] transform group-hover:scale-105 transition-transform duration-700"
                })]
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full md:w-1/2 space-y-6",
              children: [/* @__PURE__ */ jsx("div", {
                className: "inline-block px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium",
                children: "UI/UX & Branding"
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-3xl md:text-4xl font-bold text-white",
                children: "Digital Identity & UX Design"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-slate-400 text-lg leading-relaxed",
                children: "Visually stunning, responsive, and user-friendly digital experiences that capture your brand essence. We design intuitive UI/UX journeys aimed at maximizing conversion rates and user retention."
              }), /* @__PURE__ */ jsxs(Link, {
                to: "/website-design",
                className: "inline-flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition-colors group",
                children: ["Explore our design portfolio", /* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M17 8l4 4m0 0l-4 4m4-4H3"
                  })
                })]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "process",
      className: "py-24 bg-[#050505] border-y border-white/5 process-section reveal-section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-center mb-16",
          children: /* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "How we work"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-4 gap-8",
          children: [{
            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
            title: "Smart Analyzing",
            desc: "Understanding your current architecture and future goals.",
            link: "/smart-analyzing"
          }, {
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
            title: "Agile Development",
            desc: "Iterative building with continuous feedback loops.",
            link: "/agile-development"
          }, {
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
            title: "Seamless Integration",
            desc: "Zero downtime deployment and systems syncing.",
            link: "/seamless-integration"
          }, {
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            title: "Continuous Optimization",
            desc: "Monitoring, maintenance, and future-proofing.",
            link: "/continuous-optimization"
          }].map((step, idx) => /* @__PURE__ */ jsx("div", {
            className: "process-card",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative group rounded-2xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs(Link, {
                to: step.link,
                className: "relative block h-full bg-[#0a0a0a] rounded-[15px] p-8 z-10 cursor-pointer",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 border border-white/10 transition-transform duration-300 group-hover:rotate-12 group-hover:bg-white/20",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-6 h-6 text-white group-hover:text-purple-400 transition-colors",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: step.icon
                    })
                  })
                }), /* @__PURE__ */ jsxs("h3", {
                  className: "text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors",
                  children: ["0", idx + 1, ". ", step.title]
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-slate-400",
                  children: step.desc
                })]
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 lg:py-32 benefits-section reveal-section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("div", {
          className: "text-center mb-16",
          children: /* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "Why upgrade with Aarvitek?"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6",
          children: [/* @__PURE__ */ jsx("div", {
            className: "benefit-card md:col-span-2",
            children: /* @__PURE__ */ jsxs(Link, {
              to: "/enhanced-productivity",
              className: "block relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent cursor-pointer",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-10 z-10 overflow-hidden",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] group-hover:bg-purple-500/30 transition-all rounded-full"
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-purple-300 transition-colors",
                  children: "Enhanced Productivity"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-slate-400 text-lg relative z-10 max-w-md",
                  children: "Automating repetitive manual tasks so your team can focus on complex, high-impact strategies."
                })]
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "benefit-card",
            children: /* @__PURE__ */ jsxs(Link, {
              to: "/scalability",
              className: "block relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent cursor-pointer",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-10 z-10",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors",
                  children: "Scalability"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-slate-400",
                  children: "Architecture built to handle massive traffic spikes without sweating."
                })]
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "benefit-card",
            children: /* @__PURE__ */ jsxs(Link, {
              to: "/cost-efficient",
              className: "block relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent cursor-pointer",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-10 z-10",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors",
                  children: "Cost Efficient"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-slate-400",
                  children: "Reduce manual labor and server costs through optimized tech stacks."
                })]
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "benefit-card md:col-span-2",
            children: /* @__PURE__ */ jsxs(Link, {
              to: "/availability",
              className: "block relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent cursor-pointer",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#6366f1_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-10 z-10 overflow-hidden",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] group-hover:bg-indigo-500/30 transition-all rounded-full"
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-indigo-300 transition-colors",
                  children: "24/7 Availability"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-slate-400 text-lg relative z-10 max-w-md",
                  children: "Our systems run flawlessly around the clock, ensuring business continuity."
                })]
              })]
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "pricing",
      className: "py-24 bg-[#050505] border-y border-white/5 reveal-section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "Transparent Web Development Packages"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 max-w-2xl mx-auto",
            children: "Affordable, high-performance IT solutions and custom pricing plans designed for Indian startups and growing businesses."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto",
          children: [{
            name: "Starter Business",
            price: "₹4,999",
            desc: "Perfect for establishing a strong, professional digital presence.",
            popular: false,
            features: ["5 Page Responsive Website", "Essential SEO Setup", "Contact Form & Integrations", "Mobile-First UI/UX", "1 Year Domain & Hosting Free"]
          }, {
            name: "Pro E-Commerce",
            price: "₹14,999",
            desc: "Robust full-stack platforms designed to drive online sales and scale.",
            popular: true,
            features: ["React/Next.js Architecture", "Payment Gateway Integration", "Custom Admin Dashboard", "Advanced SEO Optimization", "High Performance & Speed Setup"]
          }, {
            name: "Enterprise Custom",
            price: "Custom",
            desc: "Complex architectures and AI integrations for large-scale operations.",
            popular: false,
            features: ["Custom Software & SaaS", "AI Automation Integrations", "Dedicated Cloud Infrastructure", "24/7 Priority Support", "Monthly Maintenance Retainer"]
          }].map((tier, i) => /* @__PURE__ */ jsx("div", {
            className: "relative group",
            children: /* @__PURE__ */ jsxs("div", {
              className: `relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform ${tier.popular ? "lg:scale-105 shadow-[0_0_40px_rgba(168,85,247,0.2)]" : "hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"} h-full bg-white/5 border border-white/5 hover:border-transparent`,
              children: [/* @__PURE__ */ jsx("div", {
                className: `absolute inset-[-150%] ${tier.popular ? "bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-100 animate-[spin_3s_linear_infinite]" : "bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_50%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2s_linear_infinite]"} transition-opacity duration-500`
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-8 z-10 flex flex-col overflow-hidden",
                children: [tier.popular && /* @__PURE__ */ jsxs(Fragment, {
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/30 blur-[40px] rounded-full pointer-events-none"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "absolute top-0 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-b-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg",
                    children: "Most Popular"
                  })]
                }), /* @__PURE__ */ jsx("h3", {
                  className: `text-2xl font-bold text-white mb-2 ${tier.popular ? "pt-4" : ""}`,
                  children: tier.name
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-slate-400 text-sm mb-6 h-10",
                  children: tier.desc
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-baseline gap-2 mb-8",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-4xl font-black text-white",
                    children: tier.price
                  }), tier.price !== "Custom" && /* @__PURE__ */ jsx("span", {
                    className: "text-slate-500 text-sm font-medium",
                    children: "/ starting"
                  })]
                }), /* @__PURE__ */ jsx("ul", {
                  className: "space-y-4 mb-8 flex-1",
                  children: tier.features.map((f, idx) => /* @__PURE__ */ jsxs("li", {
                    className: "flex gap-3 text-slate-300 text-sm",
                    children: [/* @__PURE__ */ jsx("svg", {
                      className: `w-5 h-5 shrink-0 ${tier.popular ? "text-purple-400" : "text-slate-500 group-hover:text-purple-400 transition-colors"}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M5 13l4 4L19 7"
                      })
                    }), f]
                  }, idx))
                }), /* @__PURE__ */ jsx(Link, {
                  to: "/contact",
                  className: `block text-center w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${tier.popular ? "bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "bg-white/10 text-white hover:bg-white/20"}`,
                  children: tier.price === "Custom" ? "Book a call" : "Get Started"
                })]
              })]
            })
          }, i))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "faq",
      className: "py-24 lg:py-32 reveal-section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-bold text-white mb-6",
            children: "Frequently Asked Questions"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg max-w-2xl mx-auto",
            children: "Everything you need to know about our web development process, pricing, and ongoing support."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-start",
          children: [/* @__PURE__ */ jsx("div", {
            className: "space-y-6",
            children: [{
              q: "How long does it take to build a custom website?",
              a: "A standard 5-page responsive website takes about 2-4 weeks. Complex e-commerce platforms or custom SaaS applications can take 8-16 weeks depending on requirements."
            }, {
              q: "What is the cost of developing an e-commerce website?",
              a: "E-commerce platforms start at ₹14,999. The final cost depends on the number of products, custom features, payment gateways, and third-party integrations you need."
            }, {
              q: "Do you provide ongoing website maintenance?",
              a: "Yes, we offer monthly maintenance retainers. This covers security updates, performance monitoring, regular backups, and content updates to ensure your site runs flawlessly."
            }, {
              q: "Will my website be mobile-friendly and SEO optimized?",
              a: "Absolutely. All our websites are built with a mobile-first approach and include fundamental technical SEO setup, ensuring your site ranks well and looks great on all devices."
            }, {
              q: "What technologies do you use for development?",
              a: "We specialize in modern, high-performance tech stacks including React, Next.js, Node.js, Tailwind CSS, WordPress, and various headless CMS platforms."
            }].map((faq, i) => /* @__PURE__ */ jsxs("details", {
              className: "group border border-white/10 bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer [&_summary::-webkit-details-marker]:hidden",
              children: [/* @__PURE__ */ jsxs("summary", {
                className: "flex justify-between items-center font-semibold text-white text-lg outline-none list-none",
                children: [faq.q, /* @__PURE__ */ jsx("span", {
                  className: "ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-purple-500/20 transition-colors",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-5 h-5 text-slate-400 group-hover:text-purple-400 group-open:rotate-180 transition-transform duration-300",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M19 9l-7 7-7-7"
                    })
                  })
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-4 text-slate-400 leading-relaxed pr-8 animate-[fadeIn_0.3s_ease-in-out]",
                children: faq.a
              })]
            }, i))
          }), /* @__PURE__ */ jsx("div", {
            className: "space-y-6",
            children: [{
              q: "Can you redesign an existing website?",
              a: "Yes! We frequently help brands modernize their digital presence. We analyze your current architecture, preserve your SEO rankings, and deliver a stunning new UI/UX."
            }, {
              q: "Who owns the code and the website once it is finished?",
              a: "You do. Once the project is fully paid for and completed, we hand over all source code, design assets, and administrative access to you."
            }, {
              q: "Do you handle web hosting and domain registration?",
              a: "Yes, our starter packages include 1-year free domain registration and hosting. We can also help migrate your site to scalable cloud providers like AWS or Vercel."
            }, {
              q: "How do we communicate during the project?",
              a: "We maintain transparent communication via email, weekly video calls, and dedicated WhatsApp/Slack channels so you are always updated on our progress."
            }, {
              q: "What if I need custom features added later?",
              a: "Our architectures are highly scalable. We can easily integrate new features, API connections, or additional pages down the line as your business grows."
            }].map((faq, i) => /* @__PURE__ */ jsxs("details", {
              className: "group border border-white/10 bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-pointer [&_summary::-webkit-details-marker]:hidden",
              children: [/* @__PURE__ */ jsxs("summary", {
                className: "flex justify-between items-center font-semibold text-white text-lg outline-none list-none",
                children: [faq.q, /* @__PURE__ */ jsx("span", {
                  className: "ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-purple-500/20 transition-colors",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-5 h-5 text-slate-400 group-hover:text-purple-400 group-open:rotate-180 transition-transform duration-300",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M19 9l-7 7-7-7"
                    })
                  })
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-4 text-slate-400 leading-relaxed pr-8 animate-[fadeIn_0.3s_ease-in-out]",
                children: faq.a
              })]
            }, i))
          })]
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$o
}, Symbol.toStringTag, { value: "Module" }));
function meta$n({}) {
  return [...generateMeta({
    title: "About Us - Aarvitek Systems | High-Performance IT & Automation",
    description: "Learn more about Aarvitek Systems, our mission, vision, and the team driving digital transformation through custom web development and AI automation.",
    url: "/about"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Aarvitek Systems",
    "description": "Learn more about Aarvitek Systems, our mission, vision, and the team driving digital transformation through custom web development and AI automation."
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "About Us",
    item: "/about"
  }]))];
}
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gray-900 text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "About Aarvitek Systems"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-gray-300",
          children: "Driven by innovation, dedicated to excellence. We are your partners in digital transformation."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20",
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("img", {
              src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              alt: "Team collaborating",
              className: "rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Our Mission"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mb-6 leading-relaxed",
              children: "At Aarvitek Systems, our mission is to empower businesses of all sizes with accessible, high-quality technology solutions. We believe that digital transformation shouldn't be complicated or prohibitively expensive."
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mb-6 leading-relaxed",
              children: "We strive to bridge the gap between complex technology and practical business needs, delivering results that drive real growth and efficiency for our clients."
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center mb-12",
          children: /* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 dark:text-white mb-4",
            children: "Our Core Values"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8",
          children: [{
            title: "Innovation",
            desc: "Constantly exploring new technologies to solve problems better."
          }, {
            title: "Integrity",
            desc: "Transparent, honest, and ethical in all our dealings."
          }, {
            title: "Customer Success",
            desc: "Your growth is our primary measure of success."
          }].map((value, i) => /* @__PURE__ */ jsxs("div", {
            className: "p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center hover:-translate-y-1 transition-transform",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
              children: value.title
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: value.desc
            })]
          }, i))
        })]
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$n
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP);
function meta$m({}) {
  return [...generateMeta({
    title: "Message from the Director | Aarvitek Systems",
    description: "Read a personal message from Aarvind Kumaar Sinha, Managing Director, about Aarvitek Systems' commitment to technology, innovation, and digital transformation.",
    url: "/director-message"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aarvind Kumaar Sinha",
    "jobTitle": "Managing Director",
    "worksFor": {
      "@type": "Organization",
      "name": "Aarvitek Systems"
    }
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Director's Message",
    item: "/director-message"
  }]))];
}
const directorMessage = UNSAFE_withComponentProps(function DirectorMessage() {
  const containerRef = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".director-animate", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });
  }, {
    scope: containerRef
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: containerRef,
    className: "min-h-screen bg-[#020202] text-slate-300 overflow-hidden pt-28 pb-20 relative",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff03_1px,_transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none"
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center max-w-3xl mx-auto mb-16 director-animate",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-6",
          children: [/* @__PURE__ */ jsx("span", {
            className: "flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-xs font-semibold text-purple-200 tracking-wider uppercase",
            children: "Leadership Vision"
          })]
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-4xl sm:text-5xl font-black text-white mb-6 leading-tight",
          children: ["Message From Our ", /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400",
            children: "Director"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-base sm:text-lg text-slate-400 leading-relaxed",
          children: "A personal note on our core values, technological commitment, and our shared journey toward digital excellence."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 director-animate",
        children: [/* @__PURE__ */ jsx("div", {
          className: "lg:col-span-4 sticky top-28",
          children: /* @__PURE__ */ jsxs("div", {
            className: "relative group rounded-3xl p-[1px] overflow-hidden bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all duration-500 shadow-xl",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_30%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-700"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative bg-[#070707] rounded-[23px] p-6 z-10 flex flex-col items-center text-center",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "w-48 h-48 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-2xl mb-6 relative group/photo",
                children: [/* @__PURE__ */ jsx("img", {
                  src: "/images/aarvind-kumaar-sinha.jpg",
                  alt: "Aarvind Kumaar Sinha - Managing Director",
                  className: "w-full h-full object-cover grayscale group-hover/photo:grayscale-0 transition-all duration-500 transform group-hover/photo:scale-110"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-purple-950/20 to-transparent mix-blend-overlay"
                })]
              }), /* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-bold text-white mb-1",
                children: "Aarvind Kumaar Sinha"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm font-semibold text-purple-400 mb-4",
                children: "Founder & Managing Director"
              }), /* @__PURE__ */ jsx("div", {
                className: "w-full border-t border-white/5 pt-4 mb-6",
                children: /* @__PURE__ */ jsx("p", {
                  className: "text-xs text-slate-500 italic",
                  children: `"Technology is not just about solving today's problems; it is about building the foundation for tomorrow's possibilities."`
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex space-x-3",
                children: [/* @__PURE__ */ jsx("a", {
                  href: "https://linkedin.com",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    })
                  })
                }), /* @__PURE__ */ jsx("a", {
                  href: "mailto:aarvind@aarvitek.com",
                  className: "w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    })
                  })
                })]
              })]
            })]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "lg:col-span-8 space-y-8 bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-xl",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg",
            children: [/* @__PURE__ */ jsx("p", {
              className: "font-semibold text-white text-xl md:text-2xl border-b border-purple-500/20 pb-4",
              children: "Welcome to Aarvitek Systems,"
            }), /* @__PURE__ */ jsxs("p", {
              children: ["At Aarvitek Systems, our core philosophy is simple yet powerful: ", /* @__PURE__ */ jsx("strong", {
                className: "text-white",
                children: "innovation should be purposeful and accessible"
              }), ". When we founded Aarvitek Systems, we saw a gap in the tech ecosystem—many growing businesses and startups struggled to access high-performance, custom-tailored enterprise-grade technology without prohibitive costs. We set out to change that dynamic."]
            }), /* @__PURE__ */ jsx("p", {
              children: "In today's hyper-connected world, a website, an e-commerce storefront, or an internal automation system is no longer just a digital placeholder. It is the primary engine of growth, customer trust, and operational speed. That is why our team of engineers, designers, and strategists are committed to producing nothing short of digital excellence. We design modern UI/UX workflows, build performant full-stack apps using bleeding-edge tools like Next.js, and deploy robust APIs designed to scale flawlessly under pressure."
            }), /* @__PURE__ */ jsx("blockquote", {
              className: "border-l-4 border-purple-500 pl-6 my-8 italic text-slate-400 bg-white/[0.02] py-4 pr-4 rounded-r-xl",
              children: '"Our mission is to stand by our clients as strategic tech partners, turning complex engineering hurdles into clean, scalable, and highly profitable digital opportunities."'
            }), /* @__PURE__ */ jsx("p", {
              children: "What makes Aarvitek unique is not just the code we write, but the partnerships we cultivate. We dive deep into understanding our clients' business workflows, target demographics, and pain points before we lay down the first line of code. We believe in absolute transparency, absolute performance, and robust security."
            }), /* @__PURE__ */ jsx("p", {
              children: "Thank you for trusting us with your vision. Whether you are launching a new startup, modernizing an established brand, or streamlining operations, Aarvitek Systems is here to guide and accelerate your digital journey."
            }), /* @__PURE__ */ jsx("p", {
              className: "pt-4",
              children: "Sincerely,"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "font-serif text-2xl text-purple-400 tracking-wide font-bold italic select-none",
                children: "Aarvind Kumaar Sinha"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm font-semibold text-white mt-2",
                children: "Aarvind Kumaar Sinha"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-xs text-slate-500",
                children: "Managing Director, Aarvitek Systems"
              })]
            }), /* @__PURE__ */ jsx("div", {
              children: /* @__PURE__ */ jsxs(Link, {
                to: "/contact",
                className: "inline-flex items-center px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]",
                children: [/* @__PURE__ */ jsx("span", {
                  children: "Connect with us"
                }), /* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 ml-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M14 5l7 7m0 0l-7 7m7-7H3"
                  })
                })]
              })
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "director-animate",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-2xl mx-auto mb-12",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-2xl md:text-3xl font-bold text-white mb-4",
            children: "Our Leadership Principles"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-slate-400",
            children: "The guiding values our director installs across all operations and development teams."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8",
          children: [{
            title: "1. Relentless Innovation",
            desc: "Constantly pushing tech stacks, performance boundaries, and UI/UX ideas to keep our clients ahead of their competition."
          }, {
            title: "2. Absolute Integrity",
            desc: "No opaque pricing, no vendor lock-ins, and complete clarity of codebase ownership. We build trust by delivering clean, maintainable code."
          }, {
            title: "3. Scalable Execution",
            desc: "Building architectures that grow with your user base. We engineering with high availability, low latency, and robust security in mind."
          }].map((principle, i) => /* @__PURE__ */ jsxs("div", {
            className: "p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-purple-500/20 hover:bg-white/[0.02] transition-all duration-300",
            children: [/* @__PURE__ */ jsx("h4", {
              className: "text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors",
              children: principle.title
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-slate-400 leading-relaxed",
              children: principle.desc
            })]
          }, i))
        })]
      })]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: directorMessage,
  meta: meta$m
}, Symbol.toStringTag, { value: "Module" }));
function meta$l({}) {
  return [...generateMeta({
    title: "Contact Us - Book a Call | Aarvitek Systems",
    description: "Get in touch with Aarvitek Systems for custom web development, e-commerce, and design needs. Book a discovery call today.",
    url: "/contact"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Aarvitek Systems",
    "description": "Get in touch with Aarvitek Systems for custom web development, e-commerce, and design needs. Book a discovery call today."
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Contact",
    item: "/contact"
  }]))];
}
const contact = UNSAFE_withComponentProps(function Contact() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-blue-600 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Get In Touch"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-blue-100",
          children: "Have a project in mind? We'd love to hear from you."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-sm",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Send us a Message"
            }), /* @__PURE__ */ jsxs("form", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "name",
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Name"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    id: "name",
                    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                    placeholder: "John Doe"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    htmlFor: "email",
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Email"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "email",
                    id: "email",
                    className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                    placeholder: "john@example.com"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "subject",
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  children: "Subject"
                }), /* @__PURE__ */ jsxs("select", {
                  id: "subject",
                  className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                  children: [/* @__PURE__ */ jsx("option", {
                    children: "General Inquiry"
                  }), /* @__PURE__ */ jsx("option", {
                    children: "Project Quote"
                  }), /* @__PURE__ */ jsx("option", {
                    children: "Support"
                  }), /* @__PURE__ */ jsx("option", {
                    children: "Other"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  htmlFor: "message",
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  children: "Message"
                }), /* @__PURE__ */ jsx("textarea", {
                  id: "message",
                  rows: 4,
                  className: "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all",
                  placeholder: "Tell us about your project..."
                })]
              }), /* @__PURE__ */ jsx("button", {
                type: "submit",
                className: "w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/30",
                children: "Send Message"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-8 lg:pl-12",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-bold text-gray-900 dark:text-white mb-6",
                children: "Contact Information"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 mb-8",
                children: "We are available during regular business hours to discuss your needs. Reach out to us via email, phone, or visit our office."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 flex-shrink-0",
                  children: /* @__PURE__ */ jsxs("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: [/* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    }), /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    })]
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-bold text-gray-900 dark:text-white",
                    children: "Our Office"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "New Delhi, India"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-bold text-gray-900 dark:text-white",
                    children: "Email Us"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "aarvitexsystems@gmail.com"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-4",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "font-bold text-gray-900 dark:text-white",
                    children: "Call Us"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600 dark:text-gray-400",
                    children: "+91 787 090 1336"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-500 text-sm",
                    children: "Mon-Fri: 9am - 6pm IST"
                  })]
                })]
              })]
            })]
          })]
        })
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact,
  meta: meta$l
}, Symbol.toStringTag, { value: "Module" }));
function meta$k({}) {
  return [...generateMeta({
    title: "Our Valued Clients & Partners | Aarvitek Systems",
    description: "Trusted by leading businesses across industries. Discover the enterprises and startups that partner with Aarvitek Systems for digital excellence.",
    url: "/clients"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Clients",
    item: "/clients"
  }]))];
}
const clients = UNSAFE_withComponentProps(function Clients() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-r from-cyan-600 to-blue-600 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Our Valued Clients"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-cyan-100",
          children: "We are proud to partner with businesses that are shaping the future."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 dark:text-white mb-4",
            children: "Trusted by Industry Leaders"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 dark:text-gray-400",
            children: "From startups to enterprises, we deliver results that matter."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-8",
          children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => /* @__PURE__ */ jsx("div", {
            className: "flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow",
            children: /* @__PURE__ */ jsxs("div", {
              className: "text-2xl font-bold text-gray-400 dark:text-gray-600",
              children: ["CLIENT ", i]
            })
          }, i))
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-20 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 md:p-12 text-center",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
            children: "Ready to become our next success story?"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/contact",
            className: "inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors",
            children: "Work With Us"
          })]
        })]
      })
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: clients,
  meta: meta$k
}, Symbol.toStringTag, { value: "Module" }));
function meta$j({}) {
  return [...generateMeta({
    title: "Careers - Join Aarvitek Systems | Tech Jobs in India",
    description: "Join our team of innovators and creators. Build the future of technology with us at Aarvitek Systems. See our open roles in development and design.",
    url: "/career"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Careers",
    item: "/career"
  }]))];
}
const career = UNSAFE_withComponentProps(function Career() {
  return /* @__PURE__ */ jsxs("div", {
    className: "pt-16 min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "bg-gradient-to-r from-orange-500 to-red-500 py-20 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl md:text-5xl font-bold mb-6",
          children: "Join Our Team"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl max-w-3xl mx-auto text-orange-100",
          children: "Build the future of technology with us. We are always looking for talented individuals."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white dark:bg-gray-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-12 mb-16",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-gray-900 dark:text-white mb-6",
              children: "Why Join Aarvitek?"
            }), /* @__PURE__ */ jsx("ul", {
              className: "space-y-4",
              children: ["Flexible remote work options", "Competitive salary & equity", "Continuous learning budget", "Health & wellness benefits"].map((item, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-gray-700 dark:text-gray-300",
                  children: item
                })]
              }, i))
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 dark:text-white mb-4",
              children: "Our Culture"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 leading-relaxed",
              children: "We foster a culture of curiosity, collaboration, and ownership. We believe in taking calculated risks and learning from failures."
            })]
          })]
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-8",
          children: "Open Positions"
        }), /* @__PURE__ */ jsx("div", {
          className: "space-y-4",
          children: [{
            title: "Senior React Developer",
            type: "Full-time",
            loc: "Remote"
          }, {
            title: "UI/UX Designer",
            type: "Full-time",
            loc: "Hybrid"
          }, {
            title: "Backend Engineer (Node.js)",
            type: "Contract",
            loc: "Remote"
          }].map((job, i) => /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-blue-500 transition-colors group",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors",
                children: job.title
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400",
                children: [/* @__PURE__ */ jsx("span", {
                  children: job.type
                }), /* @__PURE__ */ jsx("span", {
                  children: "•"
                }), /* @__PURE__ */ jsx("span", {
                  children: job.loc
                })]
              })]
            }), /* @__PURE__ */ jsx(Link, {
              to: "/contact",
              className: "mt-4 md:mt-0 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-center",
              children: "Apply Now"
            })]
          }, i))
        })]
      })
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: career,
  meta: meta$j
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$i({}) {
  return [...generateMeta({
    title: "Our Custom Web & Graphic Design Portfolio | Aarvitek Systems",
    description: "Explore custom web applications, responsive Figma mockups, high-converting e-commerce storefronts, and professional motion graphic videos engineered by Aarvitek Systems.",
    url: "/portfolio"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Aarvitek Systems Portfolio",
    "description": "Explore custom web applications, responsive Figma mockups, high-converting e-commerce storefronts, and professional motion graphic videos engineered by Aarvitek Systems."
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Portfolio",
    item: "/portfolio"
  }]))];
}
const portfolio = UNSAFE_withComponentProps(function Portfolio() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".hero-text-animate > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
    const cards = gsapWithCSS.utils.toArray(".reveal-card");
    cards.forEach((card) => {
      gsapWithCSS.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 blur-[180px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"
    }), /* @__PURE__ */ jsx("section", {
      className: "relative pt-12 pb-20 lg:pt-20 lg:pb-24 z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center hero-text-animate space-y-6",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md",
          children: [/* @__PURE__ */ jsx("span", {
            className: "flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-sm font-semibold text-purple-200 tracking-wide",
            children: "Featured Case Studies"
          })]
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none",
          children: ["Our Engineered ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400",
            children: "Digital Masterpieces"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium",
          children: "We don't settle for average. Explore our curated library of custom B2B web applications, high-converting checkout stores, bespoke brand guidelines, and high-retention video stories."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-12",
          children: [{
            img: "/images/web-development.png",
            cat: "Full-Stack Custom Web App",
            title: "Apex Retail Solutions Platform",
            desc: "Rebuilding a complex B2B logistics ecosystem using Next.js and serverless AWS architectures. Replaced a slow legacy dashboard with a high-performance system, cutting server latency times and improving database synchronization.",
            stats: [{
              val: "100/100",
              lbl: "LCP speed score"
            }, {
              val: "+320%",
              lbl: "Data speed boost"
            }],
            glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:border-purple-500/30",
            border: "group-hover:bg-purple-500"
          }, {
            img: "/images/ui-ux-design.png",
            cat: "Figma UI/UX & Interaction",
            title: "Nexa Digital Bank Blueprints",
            desc: "Crafting comprehensive mobile and desktop interactive mockup designs for an emerging digital banking product. Built custom vector component libraries, mapped complex buyer journeys, and tested click-through rates.",
            stats: [{
              val: "94%",
              lbl: "First impressions rating"
            }, {
              val: "100%",
              lbl: "Figma vector output"
            }],
            glow: "hover:shadow-[0_0_40px_rgba(244,63,94,0.15)] hover:border-pink-500/30",
            border: "group-hover:bg-pink-500"
          }, {
            img: "/images/web-development.png",
            cat: "Headless E-Commerce Solutions",
            title: "Lumina Organic Storefront",
            desc: "Engineering a fast, headless e-commerce store connected via Shopify store APIs. Replaced generic slow theme styles with a fully bespoke, conversion-rate optimized (CRO) React cart engine.",
            stats: [{
              val: "+82%",
              lbl: "Checkouts increase"
            }, {
              val: "< 1.0s",
              lbl: "Frictionless checkout speed"
            }],
            glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:border-emerald-500/30",
            border: "group-hover:bg-emerald-500"
          }, {
            img: "/images/ui-ux-design.png",
            cat: "Cinematic Video Editing & VFX",
            title: "Stellar Cloud Explainer Reel",
            desc: "Editing a high-impact promotional campaign video for an enterprise SaaS product. Handcrafted kinetic text sequences, synced complex background audio masterings, and color styled all log clips.",
            stats: [{
              val: "+85%",
              lbl: "User retention"
            }, {
              val: "4K UHD",
              lbl: "Lossless resolution"
            }],
            glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30",
            border: "group-hover:bg-indigo-500"
          }].map((item, idx) => /* @__PURE__ */ jsx("div", {
            className: "reveal-card",
            children: /* @__PURE__ */ jsxs("div", {
              className: `group rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md overflow-hidden transition-all duration-500 transform hover:-translate-y-2 cursor-pointer shadow-2xl ${item.glow}`,
              children: [/* @__PURE__ */ jsxs("div", {
                className: "relative aspect-[16/9] w-full overflow-hidden bg-white/5 border-b border-white/5",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "absolute top-0 inset-x-0 h-10 px-4 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between z-20",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex gap-1.5",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "w-2.5 h-2.5 rounded-full bg-white/10"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "w-2.5 h-2.5 rounded-full bg-white/10"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "w-2.5 h-2.5 rounded-full bg-white/10"
                    })]
                  }), /* @__PURE__ */ jsxs("span", {
                    className: "text-[10px] font-mono text-slate-500 truncate max-w-xs",
                    children: [item.title.toLowerCase().replace(/ /g, "-"), ".html"]
                  }), /* @__PURE__ */ jsx("div", {
                    className: "w-12"
                  })]
                }), /* @__PURE__ */ jsx("img", {
                  src: item.img,
                  alt: item.title,
                  className: "w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 pt-10"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "p-8 space-y-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-xs font-black tracking-widest text-slate-500 uppercase",
                    children: item.cat
                  }), /* @__PURE__ */ jsx("div", {
                    className: `w-8 h-1 rounded ${item.border} transition-colors duration-300`
                  })]
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-2xl font-black text-white group-hover:text-purple-300 transition-colors",
                  children: item.title
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-slate-400 text-sm leading-relaxed font-medium",
                  children: item.desc
                }), /* @__PURE__ */ jsx("div", {
                  className: "pt-6 border-t border-white/5 grid grid-cols-2 gap-4",
                  children: item.stats.map((stat, sIdx) => /* @__PURE__ */ jsxs("div", {
                    className: "bg-white/[0.02] border border-white/5 p-4 rounded-xl",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "block text-xl font-black text-white",
                      children: stat.val
                    }), /* @__PURE__ */ jsx("span", {
                      className: "block text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5",
                      children: stat.lbl
                    })]
                  }, sIdx))
                })]
              })]
            })
          }, idx))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative rounded-[2rem] overflow-hidden p-12 text-center border border-white/10 bg-gradient-to-br from-[#0c051a] to-[#04010a] shadow-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative z-10 space-y-6 max-w-2xl mx-auto",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-3xl md:text-4xl font-black text-white",
              children: ["Ready to Build Your Own ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
                children: "Digital Authority?"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-sm leading-relaxed",
              children: "Let's collaborate to architect a stunning custom codebase or graphic vector system that places you light years ahead of your competitors."
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-4",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "inline-block px-8 py-4 rounded-full bg-purple-600 text-white font-extrabold hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
                children: "Book a Discovery Call"
              })
            })]
          })]
        })
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: portfolio,
  meta: meta$i
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$h({}) {
  return [...generateMeta({
    title: "Custom Web Development Services & Scalable SaaS Apps | Aarvitek Systems",
    description: "Aarvitek Systems delivers high-performance custom web development services, scalable headless CMS, and secure enterprise software architectures using React, Next.js, and Node.js. Speed and SEO optimized.",
    url: "/web-development"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Web Development",
    "provider": {
      "@type": "Organization",
      "name": "Aarvitek Systems"
    },
    "description": "High-performance custom web development services, scalable headless CMS, and secure enterprise software architectures.",
    "areaServed": "IN"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Web Development",
    item: "/web-development"
  }]))];
}
const webDevelopment = UNSAFE_withComponentProps(function WebDevelopment() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".hero-text-animate > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
    gsapWithCSS.from(".hero-visual-animate", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.4
    });
    const cards = gsapWithCSS.utils.toArray(".reveal-card");
    cards.forEach((card) => {
      gsapWithCSS.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
    gsapWithCSS.from(".tech-card-animate", {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".tech-section-trigger",
        start: "top 80%"
      }
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[180px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"
    }), /* @__PURE__ */ jsx("section", {
      className: "relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-7 space-y-8 hero-text-animate",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-semibold text-purple-200 tracking-wide",
                children: "Enterprise-Grade Architecture"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]",
              children: ["Custom Web ", /* @__PURE__ */ jsx("br", {}), "Development for ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400",
                children: "High-Growth Brands"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium",
              children: "We engineer lightning-fast custom web applications, highly scalable headless CMS systems, and API-driven enterprise SaaS architectures. Powered by React, Next.js, and Node.js, we guarantee impeccable performance, absolute core-vital optimization, and organic SEO prominence."
            }), /* @__PURE__ */ jsx("ul", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300",
              children: [{
                text: "Core Web Vitals & Speed-Optimized",
                desc: "Average LCP under 1.2 seconds"
              }, {
                text: "SEO Semantic Code Architecture",
                desc: "Build for crawling & high SERP ranking"
              }, {
                text: "Scalable Full-Stack Engineering",
                desc: "API integrations & Node microservices"
              }, {
                text: "Ironclad Enterprise Security",
                desc: "SSL, OAuth, and DDoS resistant clouds"
              }].map((item, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex gap-3 items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-3.5 h-3.5 text-purple-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2.5",
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "block text-white font-bold text-sm tracking-wide",
                    children: item.text
                  }), /* @__PURE__ */ jsx("span", {
                    className: "block text-slate-500 text-xs mt-0.5",
                    children: item.desc
                  })]
                })]
              }, i))
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row gap-4 pt-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all text-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
                children: "Launch Your Project"
              }), /* @__PURE__ */ jsx("a", {
                href: "#tech-stack",
                className: "px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center",
                children: "Explore Tech Stack"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-5 relative hero-visual-animate",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 blur-3xl -z-10 rounded-full"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ff5f56]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#27c93f]"
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate",
                  children: "aarviteksystems.com/custom-web-dev"
                }), /* @__PURE__ */ jsx("div", {
                  className: "w-12 h-2"
                }), " "]
              }), /* @__PURE__ */ jsxs("div", {
                className: "aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-950/20 to-indigo-950/20 flex items-center justify-center",
                children: [/* @__PURE__ */ jsx("img", {
                  src: "/images/web-development.png",
                  alt: "Full-Stack Custom Web Development Architecture Illustration",
                  className: "w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent flex items-center justify-center relative",
                children: /* @__PURE__ */ jsx("span", {
                  className: "text-xs font-black text-emerald-400",
                  children: "100"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "Page Speed"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "Core Web Vitals Perfect"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40",
                children: /* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-purple-400",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  })
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "SEO Rank"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "Optimized Core Indexing"
                })]
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-8 bg-white/[0.02] border-y border-white/5 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center",
          children: [{
            value: "LCP < 1.2s",
            label: "Largest Contentful Paint"
          }, {
            value: "FID < 15ms",
            label: "First Input Delay"
          }, {
            value: "CLS < 0.05",
            label: "Cumulative Layout Shift"
          }, {
            value: "TTFB < 0.2s",
            label: "Time To First Byte"
          }].map((stat, i) => /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
              children: stat.value
            }), /* @__PURE__ */ jsx("span", {
              className: "block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1",
              children: stat.label
            })]
          }, i))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Tailored Coding & Full-Stack Solutions"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We build enterprise solutions crafted precisely around your business bottlenecks. No bloated code, no standard templates—just robust, performance-optimized digital engines."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-8",
          children: [{
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
            title: "Enterprise Full-Stack Web Apps",
            desc: "Custom designed SaaS systems, massive databases, secure admin dashboards, and custom backend engines engineered using TypeScript, Node, and React. Built to handle heavy workloads seamlessly.",
            keywords: "GraphQL APIs, Node microservices, PostgreSQL architectures"
          }, {
            icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
            title: "High-Converting Custom E-Commerce",
            desc: "Fully tailored storefronts utilizing headless Commerce APIs. Integrated with smooth payment gateways, advanced inventory tracking, automated discount engines, and super-fast checkouts.",
            keywords: "Stripe, Razorpay, conversion-rate optimized checkouts"
          }, {
            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
            title: "Headless CMS & Content Systems",
            desc: "Lightning-fast static front-ends integrated with powerful headless CMS engines (Strapi, Sanity, WordPress REST). Allows marketing teams to manage content easily without affecting site speeds.",
            keywords: "Static Site Generation (SSG), Incremental Regeneration"
          }, {
            icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
            title: "API Integrations & Cloud Deployment",
            desc: "Custom API development and seamless integrations with CRM networks, marketing automation channels, and ERP systems. Fully hosted on high-availability AWS/Vercel serverless configurations.",
            keywords: "RESTful & gRPC APIs, Serverless Cloud Architectures"
          }].map((card, idx) => /* @__PURE__ */ jsx("div", {
            className: "reveal-card",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] h-full bg-white/5 border border-white/5 hover:border-transparent",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_40%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2.5s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-8 md:p-10 z-10 flex flex-col justify-between overflow-hidden",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-colors"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-6",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-600 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 group-hover:rotate-6",
                    children: /* @__PURE__ */ jsx("svg", {
                      className: "w-7 h-7 text-purple-400 group-hover:text-white transition-colors",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: card.icon
                      })
                    })
                  }), /* @__PURE__ */ jsx("h3", {
                    className: "text-2xl font-bold text-white group-hover:text-purple-300 transition-colors",
                    children: card.title
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-slate-400 leading-relaxed text-sm md:text-base",
                    children: card.desc
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-2 items-center",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[10px] font-mono uppercase tracking-wider text-slate-500",
                    children: "Keywords:"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-[11px] font-semibold text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2.5 py-1 rounded-md",
                    children: card.keywords
                  })]
                })]
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "tech-stack",
      className: "py-24 bg-[#050505] border-y border-white/5 relative z-10 tech-section-trigger",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Next-Generation Tech Ecosystem"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We don't build on outdated frameworks. We utilize state-of-the-art architectures designed for blistering speeds, dynamic reactivity, and highly efficient cloud scalability."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
          children: [{
            name: "React",
            type: "Frontend Library",
            glow: "hover:shadow-[0_0_30px_rgba(14,165,233,0.25)] hover:border-sky-500/40",
            badge: "Reactive UI",
            desc: "Dynamic, fast user interfaces with reusable state hooks."
          }, {
            name: "Next.js",
            type: "SSR Framework",
            glow: "hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:border-white/40",
            badge: "Max SEO Speed",
            desc: "Server-side rendering, static site generation, and perfect SEO indexing."
          }, {
            name: "Node.js",
            type: "Backend Runtime",
            glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:border-emerald-500/40",
            badge: "Highly Concurrent",
            desc: "Asynchronous backend loops built for fast operations."
          }, {
            name: "TypeScript",
            type: "Strict Coding",
            glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:border-blue-500/40",
            badge: "Zero-Bug Code",
            desc: "Type safety, auto-documentation, and self-validating interfaces."
          }, {
            name: "PostgreSQL",
            type: "Relational DB",
            glow: "hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] hover:border-sky-400/40",
            badge: "Structured Data",
            desc: "Complex queries, ACID-compliance, and enterprise-grade datastores."
          }, {
            name: "AWS Cloud",
            type: "Infrastructure",
            glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:border-amber-500/40",
            badge: "99.99% Uptime",
            desc: "Scalable serverless lambda, secure S3 storage, and global CDN networks."
          }, {
            name: "Tailwind CSS",
            type: "Styling Framework",
            glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:border-cyan-500/40",
            badge: "Clean Responsive",
            desc: "Highly custom, responsive utility rendering with zero unused classes."
          }, {
            name: "GraphQL & REST",
            type: "API Architectures",
            glow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.25)] hover:border-pink-500/40",
            badge: "Ultra-Fast Fetching",
            desc: "Lightweight API endpoints protecting client bandwidth."
          }].map((tech, idx) => /* @__PURE__ */ jsx("div", {
            className: "tech-card-animate",
            children: /* @__PURE__ */ jsxs("div", {
              className: `group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-2 cursor-default ${tech.glow}`,
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none rounded-2xl"
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex justify-between items-center mb-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "block text-lg font-black text-white group-hover:text-purple-300 transition-colors",
                    children: tech.name
                  }), /* @__PURE__ */ jsx("span", {
                    className: "block text-[11px] text-slate-500 mt-0.5",
                    children: tech.type
                  })]
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 border border-purple-500/20 bg-purple-500/5 text-purple-300 rounded",
                  children: tech.badge
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-slate-400 text-xs leading-relaxed",
                children: tech.desc
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Our Web Development Roadmap"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "How we transform raw specifications into beautifully functional, blazingly fast custom web apps."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            num: "01",
            step: "SEO Discovery & Wireframing",
            desc: "Analyzing target keywords, designing UX mapping, and establishing performance targets."
          }, {
            num: "02",
            step: "Agile Coding Sprint",
            desc: "Writing clean, type-safe full-stack scripts. Delivering functional sprint demos weekly."
          }, {
            num: "03",
            step: "Core Vital & SEO Testing",
            desc: "Rigorous automated load testing, validating mobile layout responsiveness, and auditing SERP tags."
          }, {
            num: "04",
            step: "Cloud Infrastructure Setup",
            desc: "Deploying on scalable serverless clouds with continuous delivery pipelines (CI/CD)."
          }].map((phase, idx) => /* @__PURE__ */ jsxs("div", {
            className: "relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-4xl font-black text-purple-500/30 group-hover:text-purple-400/80 transition-colors",
              children: phase.num
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-white mt-4 mb-2 group-hover:text-purple-300 transition-colors",
              children: phase.step
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-sm leading-relaxed",
              children: phase.desc
            })]
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#0c051a] to-[#04010a] shadow-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative z-10 max-w-3xl mx-auto space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-3xl md:text-5xl font-black text-white leading-tight",
              children: ["Ready to Architect a ", /* @__PURE__ */ jsx("br", {
                className: "hidden sm:inline"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400",
                children: "High-Performance Custom Web App?"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto",
              children: "Let's build a secure, fast, and completely search-optimized platform tailored to elevate your conversions and drive organic digital growth."
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-6",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]",
                children: "Book a Free Consultation & Discovery Call"
              })
            })]
          })]
        })
      })
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: webDevelopment,
  meta: meta$h
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$g({}) {
  return [...generateMeta({
    title: "Premium UI/UX Website Design & Branding | Aarvitek Systems",
    description: "Aarvitek Systems crafts modern, responsive, and high-converting custom website designs. Specializing in high-fidelity Figma prototyping, brand UI/UX overhauls, and legacy site makeovers. 100% SEO-friendly.",
    url: "/website-design"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Website Design",
    "provider": {
      "@type": "Organization",
      "name": "Aarvitek Systems"
    },
    "description": "Modern, responsive, and high-converting custom website designs, UI/UX prototyping, and legacy site makeovers.",
    "areaServed": "IN"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Website Design",
    item: "/website-design"
  }]))];
}
const websiteDesign = UNSAFE_withComponentProps(function WebsiteDesign() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".hero-text-animate > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
    gsapWithCSS.from(".hero-visual-animate", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.4
    });
    const cards = gsapWithCSS.utils.toArray(".reveal-card");
    cards.forEach((card) => {
      gsapWithCSS.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
    gsapWithCSS.from(".tool-card-animate", {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".tool-section-trigger",
        start: "top 80%"
      }
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-pink-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 blur-[180px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"
    }), /* @__PURE__ */ jsx("section", {
      className: "relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-7 space-y-8 hero-text-animate",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-semibold text-pink-200 tracking-wide",
                children: "High-Fidelity UI/UX & Interaction"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]",
              children: ["Custom Web ", /* @__PURE__ */ jsx("br", {}), "Design That ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400",
                children: "Captivates & Converts"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium",
              children: "We craft premium, user-centric, and conversion-focused digital designs. Grounded in cognitive ergonomics and dynamic visual brand identity, we turn complex interfaces into simple, elegant, and memorable digital experiences."
            }), /* @__PURE__ */ jsx("ul", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300",
              children: [{
                text: "User-Centric UI/UX Prototyping",
                desc: "Intuitive workflows built for user action"
              }, {
                text: "Responsive Mobile-First Framework",
                desc: "Pixel-perfect views on all modern screens"
              }, {
                text: "High-Converting Micro-animations",
                desc: "Dynamic visuals that elevate bounce rates"
              }, {
                text: "Legacy Website Redesigns",
                desc: "Modernize legacy systems without losing rankings"
              }].map((item, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex gap-3 items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-3.5 h-3.5 text-pink-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2.5",
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "block text-white font-bold text-sm tracking-wide",
                    children: item.text
                  }), /* @__PURE__ */ jsx("span", {
                    className: "block text-slate-500 text-xs mt-0.5",
                    children: item.desc
                  })]
                })]
              }, i))
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row gap-4 pt-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all text-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
                children: "Schedule Design Call"
              }), /* @__PURE__ */ jsx("a", {
                href: "#design-process",
                className: "px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center",
                children: "Our Design Process"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-5 relative hero-visual-animate",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 blur-3xl -z-10 rounded-full"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ff5f56]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#27c93f]"
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate",
                  children: "aarviteksystems.com/custom-website-design"
                }), /* @__PURE__ */ jsx("div", {
                  className: "w-12 h-2"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-950/20 to-pink-950/20 flex items-center justify-center",
                children: [/* @__PURE__ */ jsx("img", {
                  src: "/images/ui-ux-design.png",
                  alt: "Responsive UI/UX Digital Branding and Custom Website Design Mockup",
                  className: "w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 relative",
                children: /* @__PURE__ */ jsx("span", {
                  className: "text-xs font-black text-pink-400",
                  children: "+3.2x"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "Conversion rate"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "Average client impact"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40",
                children: /* @__PURE__ */ jsx("span", {
                  className: "font-black text-purple-400 text-sm",
                  children: "Fi"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "UI/UX Audit"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "100% Figma Prototype"
                })]
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-8 bg-white/[0.02] border-y border-white/5 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center",
          children: [{
            value: "94%",
            label: "First Impression Metric"
          }, {
            value: "-88%",
            label: "Average Bounce Reduction"
          }, {
            value: "320%",
            label: "Conversion Lift Potential"
          }, {
            value: "100%",
            label: "Pixel-Perfect Responsive"
          }].map((stat, i) => /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400",
              children: stat.value
            }), /* @__PURE__ */ jsx("span", {
              className: "block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1",
              children: stat.label
            })]
          }, i))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Tailored Design Systems & UI/UX"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We don't buy generic theme assets. We map out bespoke color profiles, tailored icon assets, and complete interactive components mapped to your target market."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            title: "Responsive Web Layouts",
            desc: "Dynamic screen layouts engineered to scale across small mobiles, tablets, and wide retina displays. Ensuring aesthetic visual balance regardless of client browser choice.",
            tag: "Mobile First"
          }, {
            icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
            title: "Intelligent UI/UX Prototyping",
            desc: "Analyzing complete buyer personas, building user journey boards, and constructing detailed Figma blueprints to test user workflows and micro-triggers before coding starts.",
            tag: "Conversion Focus"
          }, {
            icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
            title: "Modern Website Redesigns",
            desc: "Rebuilding slow, outdated websites into futuristic visual portals. Completely redesigning the interface, restructuring menus, and enhancing load-times without affecting Google SEO indexes.",
            tag: "Brand Makeover"
          }, {
            icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122",
            title: "Interaction & Micro-Animations",
            desc: "Integrating custom SVG graphics, hover triggers, parallax depth systems, and smooth GSAP load transitions that keep users deeply engaged, increasing session times.",
            tag: "Dynamic Interfaces"
          }].map((card, idx) => /* @__PURE__ */ jsx("div", {
            className: "reveal-card",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(244,63,94,0.12)] h-full bg-white/5 border border-white/5 hover:border-transparent",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#f43f5e_40%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2.5s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 z-10 flex flex-col justify-between overflow-hidden",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-6",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center border border-pink-500/20 group-hover:bg-pink-600 group-hover:border-pink-400 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300",
                    children: /* @__PURE__ */ jsx("svg", {
                      className: "w-6 h-6 text-pink-400 group-hover:text-white transition-colors",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: card.icon
                      })
                    })
                  }), /* @__PURE__ */ jsx("h3", {
                    className: "text-xl font-bold text-white group-hover:text-pink-300 transition-colors",
                    children: card.title
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-slate-400 leading-relaxed text-sm",
                    children: card.desc
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "pt-6 mt-6 border-t border-white/5 flex items-center justify-between",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[10px] font-mono uppercase tracking-wider text-slate-500",
                    children: "Strategy:"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-[11px] font-semibold text-pink-400 bg-pink-500/5 border border-pink-500/10 px-2.5 py-0.5 rounded-md",
                    children: card.tag
                  })]
                })]
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "tools",
      className: "py-24 bg-[#050505] border-y border-white/5 relative z-10 tool-section-trigger",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Our UI/UX Production Stack"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We use industry-standard tools to map visual ecosystems, design component wires, mock dynamic behaviors, and export clean assets for our engineers."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6",
          children: [{
            name: "Figma",
            type: "Interface Design",
            glow: "hover:shadow-[0_0_20px_rgba(242,78,30,0.2)] hover:border-orange-500/40",
            icon: "Fi"
          }, {
            name: "Photoshop",
            type: "Raster Editing",
            glow: "hover:shadow-[0_0_20px_rgba(49,168,255,0.2)] hover:border-sky-500/40",
            icon: "Ps"
          }, {
            name: "Illustrator",
            type: "Vector Graphics",
            glow: "hover:shadow-[0_0_20px_rgba(255,154,0,0.2)] hover:border-amber-500/40",
            icon: "Ai"
          }, {
            name: "After Effects",
            type: "Motion UX",
            glow: "hover:shadow-[0_0_20px_rgba(153,153,255,0.2)] hover:border-indigo-500/40",
            icon: "Ae"
          }, {
            name: "Tailwind CSS",
            type: "Style Blueprint",
            glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-500/40",
            icon: "Tw"
          }, {
            name: "GSAP Motion",
            type: "UI Animation",
            glow: "hover:shadow-[0_0_20px_rgba(136,255,0,0.2)] hover:border-lime-500/40",
            icon: "Gs"
          }].map((tool, idx) => /* @__PURE__ */ jsx("div", {
            className: "tool-card-animate",
            children: /* @__PURE__ */ jsxs("div", {
              className: `group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-2 text-center cursor-default ${tool.glow}`,
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-black text-lg mx-auto mb-4 group-hover:bg-purple-600/10 group-hover:text-purple-300 group-hover:border-purple-500/30 transition-all",
                children: tool.icon
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-sm font-bold text-white group-hover:text-purple-200 transition-colors",
                children: tool.name
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-[10px] text-slate-500 mt-1",
                children: tool.type
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "design-process",
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Structured UI/UX Flow"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "A transparent, iterative pipeline that ensures we align completely with your target demographics."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            num: "01",
            step: "Discovery & SEO Mapping",
            desc: "Evaluating market niches, analyzing competing sites, defining color schemes, and planning index structure."
          }, {
            num: "02",
            step: "Wireframes & UX Blueprint",
            desc: "Constructing grayscale component wires in Figma. Drafting the navigation hierarchies and scroll maps."
          }, {
            num: "03",
            step: "Hi-Fi Prototyping & Visuals",
            desc: "Applying complete brand stylings, adding images, designing visual layouts, and creating interactive mockups."
          }, {
            num: "04",
            step: "Handover & Developer Sync",
            desc: "Preparing detailed layout specs, organizing color guides, and aligning with coding teams for flawless execution."
          }].map((phase, idx) => /* @__PURE__ */ jsxs("div", {
            className: "relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-4xl font-black text-pink-500/30 group-hover:text-pink-400/80 transition-colors",
              children: phase.num
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-white mt-4 mb-2 group-hover:text-pink-300 transition-colors",
              children: phase.step
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-sm leading-relaxed",
              children: phase.desc
            })]
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#1a0510] to-[#0a0106] shadow-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-pink-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative z-10 max-w-3xl mx-auto space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-3xl md:text-5xl font-black text-white leading-tight",
              children: ["Ready to Redesign Your ", /* @__PURE__ */ jsx("br", {
                className: "hidden sm:inline"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400",
                children: "Digital Authority?"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto",
              children: "Let's build a custom interactive UI design package to overhaul your brand value, keep users active, and significantly lift visual authority."
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-6",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]",
                children: "Get a Free Custom UI/UX Website Audit"
              })
            })]
          })]
        })
      })
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: websiteDesign,
  meta: meta$g
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$f({}) {
  return [...generateMeta({
    title: "Premium Graphic Design Services & Branding | Aarvitek Systems",
    description: "Aarvitek Systems delivers professional custom graphic design, memorable logo creation, corporate brand identity guides, and print-ready digital marketing assets. 100% SEO-optimized.",
    url: "/graphic-design"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Graphic Design",
    "provider": {
      "@type": "Organization",
      "name": "Aarvitek Systems"
    },
    "description": "Professional custom graphic design, memorable logo creation, corporate brand identity guides, and print-ready digital marketing assets.",
    "areaServed": "IN"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Graphic Design",
    item: "/graphic-design"
  }]))];
}
const graphicDesign = UNSAFE_withComponentProps(function GraphicDesign() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".hero-text-animate > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
    gsapWithCSS.from(".hero-visual-animate", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.4
    });
    const cards = gsapWithCSS.utils.toArray(".reveal-card");
    cards.forEach((card) => {
      gsapWithCSS.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
    gsapWithCSS.from(".tool-card-animate", {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".tool-section-trigger",
        start: "top 80%"
      }
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 blur-[180px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"
    }), /* @__PURE__ */ jsx("section", {
      className: "relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-7 space-y-8 hero-text-animate",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-semibold text-rose-200 tracking-wide",
                children: "Dynamic Branding & Vector Artistry"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]",
              children: ["Visual Storytelling ", /* @__PURE__ */ jsx("br", {}), "That Builds ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400",
                children: "Brand Authority"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium",
              children: "We engineer high-impact visual identities. From corporate logo packages and complete color system design guides to customized digital vector art and high-converting marketing print media, we transform abstract brand goals into striking graphical reality."
            }), /* @__PURE__ */ jsx("ul", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300",
              children: [{
                text: "Memorable Logos & Identity Guides",
                desc: "Cohesive style sheets with custom typography"
              }, {
                text: "100% Handcrafted Scalable Vectors",
                desc: "Clean SVG, EPS & AI vector assets"
              }, {
                text: "High-Converting Ad & Social Packs",
                desc: "Dynamic banners designed to lift click-throughs"
              }, {
                text: "Print-Ready Corporate Collaterals",
                desc: "High-DPI layout sheets ready for production"
              }].map((item, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex gap-3 items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-3.5 h-3.5 text-rose-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2.5",
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "block text-white font-bold text-sm tracking-wide",
                    children: item.text
                  }), /* @__PURE__ */ jsx("span", {
                    className: "block text-slate-500 text-xs mt-0.5",
                    children: item.desc
                  })]
                })]
              }, i))
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row gap-4 pt-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all text-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
                children: "Consult Our Designers"
              }), /* @__PURE__ */ jsx("a", {
                href: "#graphic-process",
                className: "px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center",
                children: "Our Creative Process"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-5 relative hero-visual-animate",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-violet-500/10 blur-3xl -z-10 rounded-full"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ff5f56]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#27c93f]"
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate",
                  children: "artboard_canvas_v2.ai (300 DPI)"
                }), /* @__PURE__ */ jsx("div", {
                  className: "w-12 h-2"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-950/20 to-rose-950/20 flex items-center justify-center",
                children: [/* @__PURE__ */ jsx("img", {
                  src: "/images/ui-ux-design.png",
                  alt: "Vector illustrations and digital branding layouts",
                  className: "w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 border border-dashed border-rose-500/30 m-8 pointer-events-none"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute top-1/2 inset-x-0 border-t border-dashed border-violet-500/30 pointer-events-none"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute left-1/2 inset-y-0 border-l border-dashed border-violet-500/30 pointer-events-none"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/30",
                children: /* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-rose-400",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2.5",
                    d: "M9 12l2 2 4-4"
                  })
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "Scale Check"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "100% Scalable SVG"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex gap-1.5 items-center",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "w-3.5 h-3.5 rounded-full bg-rose-500"
                }), /* @__PURE__ */ jsx("span", {
                  className: "w-3.5 h-3.5 rounded-full bg-pink-500"
                }), /* @__PURE__ */ jsx("span", {
                  className: "w-3.5 h-3.5 rounded-full bg-purple-500"
                }), /* @__PURE__ */ jsx("span", {
                  className: "w-3.5 h-3.5 rounded-full bg-violet-500"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "Active Brand Palette"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "Harmonious CSS Matching"
                })]
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-8 bg-white/[0.02] border-y border-white/5 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center",
          children: [{
            value: "7.4x",
            label: "Higher Visual Retention"
          }, {
            value: "300 DPI",
            label: "High-DPI Print Precision"
          }, {
            value: "100%",
            label: "Handcrafted Unique Logos"
          }, {
            value: "SVG/EPS",
            label: "Lossless Vector Formats"
          }].map((stat, i) => /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400",
              children: stat.value
            }), /* @__PURE__ */ jsx("span", {
              className: "block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1",
              children: stat.label
            })]
          }, i))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Tailored Visual Systems"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We don't use stock graphics. We map out bespoke color profiles, tailored icon assets, and complete corporate identity styles customized to your audience."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
            title: "Brand Strategy & Logo Identity",
            desc: "Forging dynamic corporate symbols and cohesive logotypes from scratch. Handing over exhaustive visual brand books defining your active colors, layouts, and font structures.",
            tag: "Logo System"
          }, {
            icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
            title: "Digital Ad & Social Design Packs",
            desc: "Creating high-CTR Google display assets, visually aesthetic social grid wireframes (Instagram, LinkedIn), and targeted graphical banners aligned to fuel your digital marketing campaigns.",
            tag: "Social & Ad Media"
          }, {
            icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            title: "Custom Explainer Infographics",
            desc: "Distilling complex statistics and abstract software concepts into simple, visually stunning explainer vectors. Highly shareable graphics customized to boost organic search backlinks.",
            tag: "Vector Infographics"
          }, {
            icon: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9v4a2 2 0 00-2 2v2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h8z",
            title: "Print-Ready Corporate Media",
            desc: "Designing premium commercial pamphlets, visual booklets, elegant business cards, and sales flyers. Exported in strict high-DPI CMYK profiles with proper bleed zones.",
            tag: "Print Collaterals"
          }].map((card, idx) => /* @__PURE__ */ jsx("div", {
            className: "reveal-card",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(244,63,94,0.12)] h-full bg-white/5 border border-white/5 hover:border-transparent",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#f43f5e_40%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2.5s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 z-10 flex flex-col justify-between overflow-hidden",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-6",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20 group-hover:bg-rose-600 group-hover:border-rose-400 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300",
                    children: /* @__PURE__ */ jsx("svg", {
                      className: "w-6 h-6 text-rose-400 group-hover:text-white transition-colors",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: card.icon
                      })
                    })
                  }), /* @__PURE__ */ jsx("h3", {
                    className: "text-xl font-bold text-white group-hover:text-rose-300 transition-colors",
                    children: card.title
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-slate-400 leading-relaxed text-sm",
                    children: card.desc
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "pt-6 mt-6 border-t border-white/5 flex items-center justify-between",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[10px] font-mono uppercase tracking-wider text-slate-500",
                    children: "Output:"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-[11px] font-semibold text-rose-400 bg-rose-500/5 border border-rose-500/10 px-2.5 py-0.5 rounded-md",
                    children: card.tag
                  })]
                })]
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "tools",
      className: "py-24 bg-[#050505] border-y border-white/5 relative z-10 tool-section-trigger",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Our Graphic Design Toolkit"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We deploy advanced graphic production suites to trace high-definition shapes, edit textures, arrange print boundaries, and compile vector packages."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6",
          children: [{
            name: "Illustrator",
            type: "Vector Creator",
            glow: "hover:shadow-[0_0_20px_rgba(255,154,0,0.2)] hover:border-amber-500/40",
            icon: "Ai"
          }, {
            name: "Photoshop",
            type: "Raster & Mockup",
            glow: "hover:shadow-[0_0_20px_rgba(49,168,255,0.2)] hover:border-sky-500/40",
            icon: "Ps"
          }, {
            name: "InDesign",
            type: "Page Layout",
            glow: "hover:shadow-[0_0_20px_rgba(255,0,102,0.2)] hover:border-rose-500/40",
            icon: "Id"
          }, {
            name: "Figma",
            type: "Component Vectors",
            glow: "hover:shadow-[0_0_20px_rgba(242,78,30,0.2)] hover:border-orange-500/40",
            icon: "Fi"
          }, {
            name: "CorelDRAW",
            type: "Print Vectorizing",
            glow: "hover:shadow-[0_0_20px_rgba(0,204,102,0.2)] hover:border-emerald-500/40",
            icon: "Cd"
          }, {
            name: "Procreate",
            type: "Digital Sketching",
            glow: "hover:shadow-[0_0_20px_rgba(153,102,255,0.2)] hover:border-purple-500/40",
            icon: "Pr"
          }].map((tool, idx) => /* @__PURE__ */ jsx("div", {
            className: "tool-card-animate",
            children: /* @__PURE__ */ jsxs("div", {
              className: `group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-2 text-center cursor-default ${tool.glow}`,
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-black text-lg mx-auto mb-4 group-hover:bg-rose-600/10 group-hover:text-rose-300 group-hover:border-rose-500/30 transition-all",
                children: tool.icon
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-sm font-bold text-white group-hover:text-rose-200 transition-colors",
                children: tool.name
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-[10px] text-slate-500 mt-1",
                children: tool.type
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "graphic-process",
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Structured Creative Pipeline"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "A highly organized four-step creation pipeline ensuring your digital collateral conveys exactly what your business represents."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            num: "01",
            step: "Moodboards & Concepting",
            desc: "Formulating initial shape ideas, checking color profiles, drawing rough layout lines, and checking logo structures."
          }, {
            num: "02",
            step: "Vector Tracing Sprints",
            desc: "Constructing scalable curve nodes in Illustrator. Designing high-DPI layouts and picking typography pairings."
          }, {
            num: "03",
            step: "Palette & Context Testing",
            desc: "Validating how graphic mockups render inside mobile websites, commercial mockups, and high-impact print collaterals."
          }, {
            num: "04",
            step: "Production Delivery Sync",
            desc: "Exporting raw layer formats (SVG, EPS, high-res PNG, bleed PDF) alongside the corporate brand guidelines book."
          }].map((phase, idx) => /* @__PURE__ */ jsxs("div", {
            className: "relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-4xl font-black text-rose-500/30 group-hover:text-rose-400/80 transition-colors",
              children: phase.num
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-white mt-4 mb-2 group-hover:text-rose-300 transition-colors",
              children: phase.step
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-sm leading-relaxed",
              children: phase.desc
            })]
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#1a0505] to-[#0a0101] shadow-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-rose-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-violet-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative z-10 max-w-3xl mx-auto space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-3xl md:text-5xl font-black text-white leading-tight",
              children: ["Ready to Redesign Your ", /* @__PURE__ */ jsx("br", {
                className: "hidden sm:inline"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400",
                children: "Brand's Visual System?"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto",
              children: "Let's architect high-impact brand guidelines and gorgeous marketing graphics to skyrocket click-throughs and secure instant user trust."
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-6",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]",
                children: "Get a Free Custom Brand Style Session"
              })
            })]
          })]
        })
      })
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: graphicDesign,
  meta: meta$f
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$e({}) {
  return [...generateMeta({
    title: "Scalable E-Commerce Web Development & Shopify Expert | Aarvitek Systems",
    description: "Aarvitek Systems delivers high-converting custom e-commerce web development, professional Shopify expert setups, and headless WooCommerce platforms. Speed, security, and checkout optimized.",
    url: "/ecommerce"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "E-Commerce Web Development",
    "provider": {
      "@type": "Organization",
      "name": "Aarvitek Systems"
    },
    "description": "High-converting custom e-commerce web development, Shopify setups, and headless WooCommerce platforms.",
    "areaServed": "IN"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "E-Commerce",
    item: "/ecommerce"
  }]))];
}
const ecommerce = UNSAFE_withComponentProps(function Ecommerce() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".hero-text-animate > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
    gsapWithCSS.from(".hero-visual-animate", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.4
    });
    const cards = gsapWithCSS.utils.toArray(".reveal-card");
    cards.forEach((card) => {
      gsapWithCSS.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
    gsapWithCSS.from(".tool-card-animate", {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".tool-section-trigger",
        start: "top 80%"
      }
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 blur-[180px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"
    }), /* @__PURE__ */ jsx("section", {
      className: "relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-7 space-y-8 hero-text-animate",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-semibold text-emerald-200 tracking-wide",
                children: "High-Converting E-Commerce Engineering"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]",
              children: ["Custom E-Commerce ", /* @__PURE__ */ jsx("br", {}), "Platforms Built ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400",
                children: "to Scale Sales"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium",
              children: "We engineer high-performance online storefronts, headless e-commerce architectures, and frictionless checkout funnels. Powered by Next.js, Shopify APIs, and WooCommerce, we build scalable platforms optimized for maximum page speed, zero cart abandonment, and complete payment security."
            }), /* @__PURE__ */ jsx("ul", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300",
              children: [{
                text: "Bespoke Headless Architectures",
                desc: "Speed-focused React & Next.js storefronts"
              }, {
                text: "Seamless Multi-Gateway Payment",
                desc: "Integrated with Stripe, Razorpay, and PayPal"
              }, {
                text: "Frictionless Checkout Funnels",
                desc: "Form setups designed to reduce cart drops"
              }, {
                text: "Automated CRM & Inventory Wires",
                desc: "Real-time stock level synchronization"
              }].map((item, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex gap-3 items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-3.5 h-3.5 text-emerald-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2.5",
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "block text-white font-bold text-sm tracking-wide",
                    children: item.text
                  }), /* @__PURE__ */ jsx("span", {
                    className: "block text-slate-500 text-xs mt-0.5",
                    children: item.desc
                  })]
                })]
              }, i))
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row gap-4 pt-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all text-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
                children: "Launch My Store"
              }), /* @__PURE__ */ jsx("a", {
                href: "#ecommerce-stack",
                className: "px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center",
                children: "Explore E-Com Stack"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-5 relative hero-visual-animate",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 blur-3xl -z-10 rounded-full"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ff5f56]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#27c93f]"
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate",
                  children: "aarviteksystems.com/custom-ecommerce"
                }), /* @__PURE__ */ jsx("div", {
                  className: "w-12 h-2"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-indigo-950/20 to-emerald-950/20 flex items-center justify-center",
                children: [/* @__PURE__ */ jsx("img", {
                  src: "/images/web-development.png",
                  alt: "High performance e-commerce platform and shopping cart design mockup",
                  className: "w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30",
                children: /* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-emerald-400",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2.5",
                    d: "M9 12l2 2 4-4"
                  })
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "SSL secured"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "Stripe & PCI compliant"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 relative",
                children: /* @__PURE__ */ jsx("span", {
                  className: "text-xs font-black text-indigo-400",
                  children: "+82%"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "Checkout rate"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "Optimized forms"
                })]
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-8 bg-white/[0.02] border-y border-white/5 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center",
          children: [{
            value: "LCP < 1.0s",
            label: "Blazing Store Speed"
          }, {
            value: "82%",
            label: "Checkouts Lift Average"
          }, {
            value: "100%",
            label: "Secure PCI Compliance"
          }, {
            value: "Real-Time",
            label: "Inventory Sync Wires"
          }].map((stat, i) => /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400",
              children: stat.value
            }), /* @__PURE__ */ jsx("span", {
              className: "block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1",
              children: stat.label
            })]
          }, i))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Tailored Selling Systems & Storefronts"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We don't build standard stock templates. We engineer bespoke checkout steps, custom product grids, and complete automated pipelines to streamline merchant operations."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
            title: "Custom Headless Storefronts",
            desc: "Architecting React and Next.js frontends connected with headless Shopify or Commerce APIs. Guaranteeing blazing speeds and custom layout freedoms standard templates cannot offer.",
            tag: "Headless E-Com"
          }, {
            icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
            title: "Shopify Customization & Setup",
            desc: "Delivering fast, beautiful stores on the world's most stable storefront framework. Providing completely bespoke Liquid theme customizations, app setup wires, and automated checkout rules.",
            tag: "Shopify Specialist"
          }, {
            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
            title: "WooCommerce Engine Integration",
            desc: "Turning standard WordPress portals into high-volume selling systems. Coding custom WooCommerce page layouts, cart hooks, and custom administrative dashboard management screens.",
            tag: "WooCommerce Pro"
          }, {
            icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
            title: "Secure Multi-Gateway Payment Rails",
            desc: "Integrating secure payment gateways (Stripe, Razorpay, PayPal) with proper error auditing, webhook listeners, automated client invoicing, and secure SSL datastores.",
            tag: "Payment Systems"
          }].map((card, idx) => /* @__PURE__ */ jsx("div", {
            className: "reveal-card",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(16,185,129,0.12)] h-full bg-white/5 border border-white/5 hover:border-transparent",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#10b981_40%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2.5s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 z-10 flex flex-col justify-between overflow-hidden",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-6",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300",
                    children: /* @__PURE__ */ jsx("svg", {
                      className: "w-6 h-6 text-emerald-400 group-hover:text-white transition-colors",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: card.icon
                      })
                    })
                  }), /* @__PURE__ */ jsx("h3", {
                    className: "text-xl font-bold text-white group-hover:text-emerald-300 transition-colors",
                    children: card.title
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-slate-400 leading-relaxed text-sm",
                    children: card.desc
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "pt-6 mt-6 border-t border-white/5 flex items-center justify-between",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[10px] font-mono uppercase tracking-wider text-slate-500",
                    children: "Engine:"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-[11px] font-semibold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded-md",
                    children: card.tag
                  })]
                })]
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "ecommerce-stack",
      className: "py-24 bg-[#050505] border-y border-white/5 relative z-10 tool-section-trigger",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Our E-Commerce Stack"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We use industry-standard libraries to construct robust cart systems, process payments securely, build fast SSR front-ends, and host scaling online stores."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6",
          children: [{
            name: "Next.js",
            type: "Store SSR",
            glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:border-white/40",
            icon: "Nx"
          }, {
            name: "Shopify API",
            type: "Headless Sales",
            glow: "hover:shadow-[0_0_20px_rgba(150,191,72,0.2)] hover:border-[#96bf48]/40",
            icon: "Sh"
          }, {
            name: "WooCommerce",
            type: "WP selling",
            glow: "hover:shadow-[0_0_20px_rgba(150,90,200,0.2)] hover:border-purple-500/40",
            icon: "Wc"
          }, {
            name: "Stripe",
            type: "Payment gateway",
            glow: "hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:border-indigo-500/40",
            icon: "St"
          }, {
            name: "PostgreSQL",
            type: "Products DB",
            glow: "hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:border-sky-500/40",
            icon: "Pg"
          }, {
            name: "AWS Serverless",
            type: "Scale Scaling",
            glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-500/40",
            icon: "Aw"
          }].map((tool, idx) => /* @__PURE__ */ jsx("div", {
            className: "tool-card-animate",
            children: /* @__PURE__ */ jsxs("div", {
              className: `group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-2 text-center cursor-default ${tool.glow}`,
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-black text-lg mx-auto mb-4 group-hover:bg-purple-600/10 group-hover:text-purple-300 group-hover:border-purple-500/30 transition-all",
                children: tool.icon
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-sm font-bold text-white group-hover:text-purple-200 transition-colors",
                children: tool.name
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-[10px] text-slate-500 mt-1",
                children: tool.type
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "ecommerce-process",
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Structured E-Com Development Flow"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "A highly organized four-step creation pipeline ensuring your digital catalog sells exactly what your business yields."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            num: "01",
            step: "Catalog & Funnel Map",
            desc: "Auditing product attributes, defining visual product categories, layout plans, and mapping the payment structures."
          }, {
            num: "02",
            step: "Frictionless Cart Wires",
            desc: "Constructing scalable shopping cart wires in Figma. Designing fast checkout forms and setting up payment methods."
          }, {
            num: "03",
            step: "API Gate & Security Audit",
            desc: "Testing payment gateway webhooks, checking stock level synchronization rules, and validating core speed stats."
          }, {
            num: "04",
            step: "Scale Serverless Setup",
            desc: "Deploying high-speed serverless setups on AWS or Vercel, hooked with automated analytical dashboard trackers."
          }].map((phase, idx) => /* @__PURE__ */ jsxs("div", {
            className: "relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-4xl font-black text-emerald-500/30 group-hover:text-emerald-400/80 transition-colors",
              children: phase.num
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-white mt-4 mb-2 group-hover:text-emerald-300 transition-colors",
              children: phase.step
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-sm leading-relaxed",
              children: phase.desc
            })]
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#051a10] to-[#010a06] shadow-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative z-10 max-w-3xl mx-auto space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-3xl md:text-5xl font-black text-white leading-tight",
              children: ["Ready to Architect a ", /* @__PURE__ */ jsx("br", {
                className: "hidden sm:inline"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400",
                children: "High-Performance Custom Store?"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto",
              children: "Let's build a secure, fast, and completely checkout-optimized e-commerce platform tailored to elevate your sales and drive organic retail growth."
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-6",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]",
                children: "Get a Free Custom Store CRO Audits"
              })
            })]
          })]
        })
      })
    })]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ecommerce,
  meta: meta$e
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$d({}) {
  return [...generateMeta({
    title: "Privacy Policy & Data Protection | Aarvitek Systems",
    description: "Learn how Aarvitek Systems safeguards your personal details, cookies, and business intellectual property on our high-performance IT and custom web development systems.",
    url: "/privacy-policy"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Privacy Policy",
    item: "/privacy-policy"
  }]))];
}
const privacyPolicy = UNSAFE_withComponentProps(function PrivacyPolicy() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".fade-in-animate > *", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in-animate",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center pt-12 pb-16 space-y-6",
        children: [/* @__PURE__ */ jsx("div", {
          className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-4",
          children: /* @__PURE__ */ jsx("svg", {
            className: "w-8 h-8 text-purple-400",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            })
          })
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-4xl md:text-6xl font-black tracking-tight text-white leading-tight",
          children: ["Privacy Policy & ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
            children: "Data Protection"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium",
          children: "Last Updated: May 19, 2026. At Aarvitek Systems, your digital privacy and business intellectual property security are foundational to our engineering values."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 md:p-16 shadow-2xl overflow-hidden space-y-12",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none"
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "1. Information We Collect"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "When you browse our website, request a custom software design consult, or book a discovery call, we collect information that helps us serve you. This includes:"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-2 pl-4 text-slate-300",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Contact Details**: Your name, corporate email address, phone number, and company name."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Usage & Device Data**: IP addresses, browser types, screen specifications, and page interaction flows collected via secure analytics."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Payment Details**: All transaction pipelines are handled by compliant, third-party payment gateways (Stripe & Razorpay); no raw card credentials are saved on our servers."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "2. How We Process Your Data"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "Aarvitek Systems utilizes data solely to improve your technical systems integration and keep communication lines clear. We process personal and corporate details to:"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-2 pl-4 text-slate-300",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Architect bespoke, custom web applications and full-stack software codes."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Deliver precise responsive website mockups, print vectors, and store catalogs."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Improve Core Web Vitals performance, security layers, and SEO search results."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Maintain transparent agile sprint scheduling and priority serverless deployments."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "3. Data Security & Encrypted Clouds"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "Your personal data is encrypted both in transit (using robust Secure Socket Layers - SSL) and at rest. We house all digital storage configurations inside scalable, serverless AWS Cloud setups protected by automated IAM rules and DDoS resistant firewall routing protocols."
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "While we deploy industry-standard security architectures, no system is completely immune to risks. We perform regular security audits to identify and patch system flaws immediately."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "4. Your Data Protection Rights"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "We support international data regulation rights, including the European Union's General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). You hold full authority to:"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-2 pl-4 text-slate-300",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Request complete digital copies of all personal details saved in our databases."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Amend, correct, or refine outdated corporate accounts and listings."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: 'Request full deletion of all customer files (the "Right to be Forgotten").'
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Object to data processing for marketing, metrics reporting, and newsletters."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "5. Cookies & Tracking Frameworks"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "Our platform utilizes cookies to enhance loading speed and preserve user settings. We run essential operational cookies (e.g., Stripe transaction cookies) and statistical analytics cookies (e.g., Google Analytics). You can manage or block cookies directly via your browser settings, although some interactive features may scale back as a result."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "6. Reaching Out to Aarvitek"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "If you have specific questions regarding this Privacy Policy, your saved data profiles, or secure repository hosting methods, please reach out to our primary data officer:"
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-2xl border border-white/5 bg-white/[0.01] inline-block space-y-2 mt-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-white font-bold",
              children: "Aarvitek Systems Data Compliance Team"
            }), /* @__PURE__ */ jsx("span", {
              className: "block text-sm text-slate-400",
              children: "New Delhi, India"
            }), /* @__PURE__ */ jsx("a", {
              href: "mailto:aarvitexsystems@gmail.com",
              className: "block text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium",
              children: "aarvitexsystems@gmail.com"
            }), /* @__PURE__ */ jsx("a", {
              href: "tel:+917870901336",
              className: "block text-sm text-slate-400 hover:text-white transition-colors",
              children: "+91 787 090 1336"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "text-center mt-12",
        children: /* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group font-semibold",
          children: [/* @__PURE__ */ jsx("svg", {
            className: "w-4 h-4 group-hover:-translate-x-1 transition-transform",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2.5",
              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
            })
          }), "Return to Homepage"]
        })
      })]
    })]
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: privacyPolicy,
  meta: meta$d
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$c({}) {
  return [...generateMeta({
    title: "Terms of Service & Agreements | Aarvitek Systems",
    description: "Read the Terms of Service governing code delivery, Figma layouts ownership, secure payment processing, and agile development contracts at Aarvitek Systems.",
    url: "/terms"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Terms of Service",
    item: "/terms"
  }]))];
}
const terms = UNSAFE_withComponentProps(function Terms() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".fade-in-animate > *", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 fade-in-animate",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center pt-12 pb-16 space-y-6",
        children: [/* @__PURE__ */ jsx("div", {
          className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-4",
          children: /* @__PURE__ */ jsx("svg", {
            className: "w-8 h-8 text-purple-400",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2",
              d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            })
          })
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-4xl md:text-6xl font-black tracking-tight text-white leading-tight",
          children: ["Terms of ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
            children: "Service Agreement"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium",
          children: "Last Updated: May 19, 2026. These Terms govern your engagement with aarviteksystems.com and define how we deliver high-performance code and branding systems."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl p-8 md:p-16 shadow-2xl overflow-hidden space-y-12",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-0 left-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none"
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "1. Agreement to Terms"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "By navigating our website, interacting with our digital interfaces, or contracting Aarvitek Systems for custom software engineering, e-commerce builds, or vector design packs, you agree to comply with and be legally bound by these Terms of Service. If you disagree with any terms defined here, you must immediately halt platform access."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "2. Code & Intellectual Property Rights"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "We believe in absolute client ownership. Our intellectual property transfer guarantees the following:"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-2 pl-4 text-slate-300",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Full Codebase Ownership**: Upon receipt of final payment, Aarvitek Systems transfers **100% full, unrestricted ownership** of the custom-written code, databases, and visual mockup assets to the client."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Open-Source Dependencies**: Any open-source packages (e.g. React Router, GSAP, Tailwind CSS) incorporated remain governed by their respective licenses."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Design Blueprints**: Custom Figma artboards and print-ready vector sheets belong completely to the paying client."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "3. User Conduct & Security Rules"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "When interacting with Aarvitek Systems' digital platforms or serverless channels, you agree not to:"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-2 pl-4 text-slate-300",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Attempt unauthorized network penetration testing, hacking, or DDoS attacks on our AWS hosted setups."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Deploy scraping bots, automated extractors, or spam frameworks on our contact portals."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Use Aarvitek engineered systems for illegal, malicious, or highly deceptive digital practices."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "4. Project Timelines & Agile Milestones"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "Aarvitek Systems delivers visual designs and systems code under an agile sprint methodology:"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-2 pl-4 text-slate-300",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Sprint Timelines**: Projects are organized into 2-week active sprints with defined milestones."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Revision Approvals**: Visual wireframes and layouts are submitted for client review; sprint progress requires written sign-offs."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Delay Audits**: Project completion dates are estimated; we aren't liable for delays caused by client assets collection, third-party API downtimes, or communication halts."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "5. Invoicing & Secure Payment Rules"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "Engagement invoicing adheres to secure, standard billing pathways:"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-2 pl-4 text-slate-300",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Standard Installment Split**: Typically structured as 50% initial design/scoping retainer fee, and 50% upon successful system deployment."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Payment Gateway compliance**: Secure transaction processes are cleared through compliant channels (Stripe or Razorpay). We hold no local financial credentials."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "**Late Retainer Suspension**: Delays in installment payments past 7 business days may lead to active code repository suspension."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "6. Disclaimers & Limitation of Liability"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "Aarvitek Systems delivers high-performance code and branding guides engineered to meet strict modern security metrics. However, we do not claim:"
          }), /* @__PURE__ */ jsxs("ul", {
            className: "space-y-2 pl-4 text-slate-300",
            children: [/* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "That third-party server hosting providers (e.g. AWS, Vercel, Netlify) will be 100% immune to all operational server downtimes."
              })]
            }), /* @__PURE__ */ jsxs("li", {
              className: "flex gap-2 items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "w-1.5 h-1.5 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                children: "Liability for sudden changes or deprecations of third-party system APIs (such as Shopify API upgrades, Google Map API changes, etc.) made post-handover."
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white tracking-wide border-l-4 border-purple-500 pl-4",
            children: "7. Governing Law"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 leading-relaxed",
            children: "These Terms of Service and any digital contracts entered into with Aarvitek Systems are governed by and construed in accordance with the laws of **Delhi, India**, without regard to conflict of law principles. Any legal actions or proceedings must be initiated solely in competent courts located in Delhi, India."
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "text-center mt-12",
        children: /* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group font-semibold",
          children: [/* @__PURE__ */ jsx("svg", {
            className: "w-4 h-4 group-hover:-translate-x-1 transition-transform",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2.5",
              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
            })
          }), "Return to Homepage"]
        })
      })]
    })]
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: terms,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
gsapWithCSS.registerPlugin(useGSAP, ScrollTrigger);
function meta$b({}) {
  return [...generateMeta({
    title: "Premium Video Editing & Visual Production | Aarvitek Systems",
    description: "Aarvitek Systems delivers high-impact custom video editing, dynamic motion graphics, corporate video production, and high-retention social media reels. 100% SEO-optimized.",
    url: "/video-editing"
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Video Editing",
    "provider": {
      "@type": "Organization",
      "name": "Aarvitek Systems"
    },
    "description": "High-impact custom video editing, dynamic motion graphics, corporate video production, and high-retention social media reels.",
    "areaServed": "IN"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Video Editing",
    item: "/video-editing"
  }]))];
}
const videoEditing = UNSAFE_withComponentProps(function VideoEditing() {
  const container = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".hero-text-animate > *", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.1
    });
    gsapWithCSS.from(".hero-visual-animate", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.4
    });
    const cards = gsapWithCSS.utils.toArray(".reveal-card");
    cards.forEach((card) => {
      gsapWithCSS.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%"
        }
      });
    });
    gsapWithCSS.from(".tool-card-animate", {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".tool-section-trigger",
        start: "top 80%"
      }
    });
  }, {
    scope: container
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: container,
    className: "min-h-screen bg-[#000000] text-slate-300 selection:bg-purple-500/30 overflow-hidden pt-24 pb-12",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-rose-500/10 blur-[180px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05_1px,_transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none"
    }), /* @__PURE__ */ jsx("section", {
      className: "relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-7 space-y-8 hero-text-animate",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-semibold text-purple-200 tracking-wide",
                children: "Cinematic Motion & Post-Production"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]",
              children: ["Custom Video ", /* @__PURE__ */ jsx("br", {}), "Editing That ", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400",
                children: "Multiplies Views"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-medium",
              children: "We engineer high-retention video stories. By combining professional timeline sequencing, precise audio enhancement, cinema-grade color styling, and dynamic motion typography overlays, we transform raw rushes into engaging brand assets."
            }), /* @__PURE__ */ jsx("ul", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300",
              children: [{
                text: "Cinematic Color & Grading",
                desc: "Cohesive lut schemes matching corporate guides"
              }, {
                text: "Dynamic Motion & VFX Layers",
                desc: "Engaging 2D/3D title sequences and tracks"
              }, {
                text: "High-Retention Social Formats",
                desc: "Optimized reels, shorts, and explainer clips"
              }, {
                text: "Pristine Sound Design & SFX",
                desc: "Voice cleaning, licensing, and audio effects"
              }].map((item, i) => /* @__PURE__ */ jsxs("li", {
                className: "flex gap-3 items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-3.5 h-3.5 text-purple-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2.5",
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "block text-white font-bold text-sm tracking-wide",
                    children: item.text
                  }), /* @__PURE__ */ jsx("span", {
                    className: "block text-slate-500 text-xs mt-0.5",
                    children: item.desc
                  })]
                })]
              }, i))
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row gap-4 pt-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 transition-all text-center shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]",
                children: "Schedule Visual Consult"
              }), /* @__PURE__ */ jsx("a", {
                href: "#editing-process",
                className: "px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-all text-center",
                children: "Our Creative Process"
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-5 relative hero-visual-animate",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-rose-500/10 blur-3xl -z-10 rounded-full"
            }), /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ff5f56]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "w-3.5 h-3.5 rounded-full bg-[#27c93f]"
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "px-4 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-500 font-mono tracking-wider w-64 text-center truncate",
                  children: "video_timeline_v4.prproj (4K UHD)"
                }), /* @__PURE__ */ jsx("div", {
                  className: "w-12 h-2"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-purple-950/20 to-rose-950/20 flex items-center justify-center",
                children: [/* @__PURE__ */ jsx("img", {
                  src: "/images/ui-ux-design.png",
                  alt: "Professional Video Editing and Motion Design Timeline Mockup",
                  className: "w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "absolute bottom-4 left-4 right-4 h-16 bg-black/60 backdrop-blur-md rounded-xl border border-white/5 p-3 flex flex-col justify-between overflow-hidden",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex gap-1 h-3 items-center",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "w-16 h-2 bg-purple-500/60 rounded"
                    }), /* @__PURE__ */ jsx("div", {
                      className: "w-24 h-2 bg-pink-500/60 rounded"
                    }), /* @__PURE__ */ jsx("div", {
                      className: "w-8 h-2 bg-violet-500/60 rounded"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex gap-1 h-3 items-center",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "w-32 h-2 bg-teal-500/40 rounded"
                    }), /* @__PURE__ */ jsx("div", {
                      className: "w-12 h-2 bg-emerald-500/40 rounded"
                    })]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -top-6 -right-6 md:-right-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_4s_infinite_ease-in-out]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30",
                children: /* @__PURE__ */ jsx("span", {
                  className: "text-xs font-black text-purple-400",
                  children: "4K"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "Resolution"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "UHD 60FPS Lossless"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute -bottom-6 -left-6 md:-left-8 p-4 rounded-2xl border border-white/15 bg-[#0d0d0d]/90 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-[bounce_5s_infinite_ease-in-out_1s]",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30 relative",
                children: /* @__PURE__ */ jsx("span", {
                  className: "text-xs font-black text-pink-400",
                  children: "+85%"
                })
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("span", {
                  className: "block text-white font-extrabold text-xs tracking-wider uppercase",
                  children: "User retention"
                }), /* @__PURE__ */ jsx("span", {
                  className: "block text-slate-400 text-[10px]",
                  children: "Average organic lift"
                })]
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-8 bg-white/[0.02] border-y border-white/5 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center",
          children: [{
            value: "85%",
            label: "Average retention lift"
          }, {
            value: "4K UHD",
            label: "Lossless Export Resolution"
          }, {
            value: "10x",
            label: "Organic views potential"
          }, {
            value: "Stereo/5.1",
            label: "High-Fidelity Audio mix"
          }].map((stat, i) => /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400",
              children: stat.value
            }), /* @__PURE__ */ jsx("span", {
              className: "block text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1",
              children: stat.label
            })]
          }, i))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Tailored Visual Post-Production"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We don't do simple templates cut. We map custom timeline cuts, color settings, and motion graphics tailored completely to capture viewer attention instantly."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
            title: "Corporate & Explainer Videos",
            desc: "Distilling complex services, software configurations, or physical systems operations into highly polished visual explainers engineered to drive B2B buyer actions.",
            tag: "B2B explainers"
          }, {
            icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
            title: "High-Retention Social Reels",
            desc: "Optimizing video cuts for fast-paced mobile viewers (Instagram, YouTube Shorts, TikTok). Adding custom graphics and auto-captions designed to increase viewer retention index.",
            tag: "Mobile Engagement"
          }, {
            icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z",
            title: "Dynamic Motion & Title VFX",
            desc: "Constructing striking visual effects, custom animated typography titles, clean transition maps, and 3D kinetic layouts to elevate overall production quality.",
            tag: "Motion FX"
          }, {
            icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
            title: "Audio Mastering & SFX Mixing",
            desc: "Equalizing voiceovers, eliminating disruptive ambient room noise, layering custom licensed scores, and applying impact sound effects that match active visual cuts.",
            tag: "Sound Engineering"
          }].map((card, idx) => /* @__PURE__ */ jsx("div", {
            className: "reveal-card",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative group rounded-3xl p-[1px] overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(168,85,247,0.12)] h-full bg-white/5 border border-white/5 hover:border-transparent",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#a855f7_40%,#00000000_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_2.5s_linear_infinite] transition-opacity duration-500"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative h-full bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 z-10 flex flex-col justify-between overflow-hidden",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "space-y-6",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-600 group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300",
                    children: /* @__PURE__ */ jsx("svg", {
                      className: "w-6 h-6 text-purple-400 group-hover:text-white transition-colors",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: card.icon
                      })
                    })
                  }), /* @__PURE__ */ jsx("h3", {
                    className: "text-xl font-bold text-white group-hover:text-purple-300 transition-colors",
                    children: card.title
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-slate-400 leading-relaxed text-sm",
                    children: card.desc
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "pt-6 mt-6 border-t border-white/5 flex items-center justify-between",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-[10px] font-mono uppercase tracking-wider text-slate-500",
                    children: "Service:"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-[11px] font-semibold text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2.5 py-0.5 rounded-md",
                    children: card.tag
                  })]
                })]
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "tools",
      className: "py-24 bg-[#050505] border-y border-white/5 relative z-10 tool-section-trigger",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Our Editing & Motion Stack"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "We use advanced, professional systems to sequence clips, grade color values, and compose motion titles."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6",
          children: [{
            name: "Premiere Pro",
            type: "Timeline Assembly",
            glow: "hover:shadow-[0_0_20px_rgba(153,102,255,0.2)] hover:border-purple-500/40",
            icon: "Pr"
          }, {
            name: "After Effects",
            type: "Motion Graphics",
            glow: "hover:shadow-[0_0_20px_rgba(153,153,255,0.2)] hover:border-indigo-500/40",
            icon: "Ae"
          }, {
            name: "DaVinci Resolve",
            type: "Color Styling",
            glow: "hover:shadow-[0_0_20px_rgba(255,102,0,0.2)] hover:border-amber-500/40",
            icon: "Dr"
          }, {
            name: "Audition",
            type: "Audio Mastering",
            glow: "hover:shadow-[0_0_20px_rgba(0,255,204,0.2)] hover:border-teal-500/40",
            icon: "Au"
          }, {
            name: "Figma",
            type: "Vector Layouts",
            glow: "hover:shadow-[0_0_20px_rgba(242,78,30,0.2)] hover:border-orange-500/40",
            icon: "Fi"
          }, {
            name: "Photoshop",
            type: "Graphic Assests",
            glow: "hover:shadow-[0_0_20px_rgba(49,168,255,0.2)] hover:border-sky-500/40",
            icon: "Ps"
          }].map((tool, idx) => /* @__PURE__ */ jsx("div", {
            className: "tool-card-animate",
            children: /* @__PURE__ */ jsxs("div", {
              className: `group relative p-6 rounded-2xl border border-white/5 bg-[#0a0a0a] transition-all duration-300 transform hover:-translate-y-2 text-center cursor-default ${tool.glow}`,
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-black text-lg mx-auto mb-4 group-hover:bg-purple-600/10 group-hover:text-purple-300 group-hover:border-purple-500/30 transition-all",
                children: tool.icon
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-sm font-bold text-white group-hover:text-purple-200 transition-colors",
                children: tool.name
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-[10px] text-slate-500 mt-1",
                children: tool.type
              })]
            })
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "editing-process",
      className: "py-24 relative z-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-5xl font-black tracking-tight text-white mb-6",
            children: "Structured Video Pipeline"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-lg leading-relaxed",
            children: "A highly organized four-step creation pipeline ensuring your digital media hooks viewer attention instantly."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
          children: [{
            num: "01",
            step: "Asset Scoping & Story",
            desc: "Analyzing target timelines, organizing raw rushes, writing narration scripts, and planning background scores."
          }, {
            num: "02",
            step: "A-Roll Assembly & Cuts",
            desc: "Trimming dead space, arranging visual hooks in the initial 3 seconds, and sequencing A-Roll narrative maps."
          }, {
            num: "03",
            step: "Color Grade & Motion VFX",
            desc: "Injecting kinetic captions, adding custom shape transitions, grading footage logs, and layering audio SFX."
          }, {
            num: "04",
            step: "Client Review & UHD Export",
            desc: "Delivering review cuts via Frame.io, integrating feedback edits, and exporting in lossless 4K UHD profiles."
          }].map((phase, idx) => /* @__PURE__ */ jsxs("div", {
            className: "relative group p-6 rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md",
            children: [/* @__PURE__ */ jsx("span", {
              className: "block text-4xl font-black text-purple-500/30 group-hover:text-purple-400/80 transition-colors",
              children: phase.num
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-white mt-4 mb-2 group-hover:text-purple-300 transition-colors",
              children: phase.step
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-sm leading-relaxed",
              children: phase.desc
            })]
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 relative z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center border border-white/10 bg-gradient-to-br from-[#12051a] to-[#04010a] shadow-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsx("div", {
            className: "absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-rose-500/20 blur-[80px] rounded-full pointer-events-none"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative z-10 max-w-3xl mx-auto space-y-6",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-3xl md:text-5xl font-black text-white leading-tight",
              children: ["Ready to Elevate Your ", /* @__PURE__ */ jsx("br", {
                className: "hidden sm:inline"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400",
                children: "Visual Production Quality?"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto",
              children: "Let's build a custom premium video editing package to supercharge your YouTube channel, B2B explainers, or social media retention rates."
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-6",
              children: /* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "inline-block px-10 py-5 rounded-full bg-purple-600 text-white font-extrabold text-lg hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]",
                children: "Get a Free 15-Second Audition Video Cut"
              })
            })]
          })]
        })
      })
    })]
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: videoEditing,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
function meta$a({}) {
  return [...generateMeta({
    title: "Smart Analyzing - How We Work | Aarvitek Systems",
    description: "Phase 1 of our process: Understanding your current architecture and future goals through smart analyzing and strategic discovery.",
    url: "/smart-analyzing"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Smart Analyzing",
    item: "/smart-analyzing"
  }]))];
}
const smartAnalyzing = UNSAFE_withComponentProps(function SmartAnalyzing() {
  return /* @__PURE__ */ jsx("div", {
    className: "pt-16 min-h-screen bg-[#000000] text-slate-300",
    children: /* @__PURE__ */ jsxs("section", {
      className: "py-20 lg:py-32 relative overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row items-center gap-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "w-full lg:w-1/2 space-y-8 relative z-10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-purple-200 tracking-wide",
                children: "Phase 01"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl lg:text-7xl font-black text-white leading-tight",
              children: ["Smart ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
                children: "Analyzing"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-slate-400 leading-relaxed",
              children: "We begin every project by deeply understanding your current architecture, business objectives, and user needs. Through meticulous data analysis and strategic planning, we architect solutions that are purpose-built for your future goals."
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-4 flex gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]",
                children: "Consult With Us"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all",
                children: "Back to Home"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-1/2 relative z-10",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-3xl overflow-hidden border border-white/10 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-colors z-10"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/smart-analyzing.png",
                alt: "Smart Analyzing and Data Strategy",
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              })]
            })
          })]
        })
      })]
    })
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: smartAnalyzing,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
function meta$9({}) {
  return [...generateMeta({
    title: "Agile Development - How We Work | Aarvitek Systems",
    description: "Phase 2 of our process: Iterative building with continuous feedback loops for efficient software development and faster time-to-market.",
    url: "/agile-development"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Agile Development",
    item: "/agile-development"
  }]))];
}
const agileDevelopment = UNSAFE_withComponentProps(function AgileDevelopment() {
  return /* @__PURE__ */ jsx("div", {
    className: "pt-16 min-h-screen bg-[#000000] text-slate-300",
    children: /* @__PURE__ */ jsxs("section", {
      className: "py-20 lg:py-32 relative overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row-reverse items-center gap-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "w-full lg:w-1/2 space-y-8 relative z-10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-blue-500"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-blue-200 tracking-wide",
                children: "Phase 02"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl lg:text-7xl font-black text-white leading-tight",
              children: ["Agile ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400",
                children: "Development"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-slate-400 leading-relaxed",
              children: "We utilize agile methodologies to build iteratively. This ensures continuous feedback loops, allowing us to adapt quickly and guarantee the final product perfectly aligns with your expectations and market demands."
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-4 flex gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]",
                children: "Consult With Us"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all",
                children: "Back to Home"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-1/2 relative z-10",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-3xl overflow-hidden border border-white/10 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors z-10"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/agile-development.png",
                alt: "Agile Software Development",
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              })]
            })
          })]
        })
      })]
    })
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: agileDevelopment,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
function meta$8({}) {
  return [...generateMeta({
    title: "Seamless Integration - How We Work | Aarvitek Systems",
    description: "Phase 3 of our process: Zero downtime deployment and seamless systems syncing for enterprise businesses and startups.",
    url: "/seamless-integration"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Seamless Integration",
    item: "/seamless-integration"
  }]))];
}
const seamlessIntegration = UNSAFE_withComponentProps(function SeamlessIntegration() {
  return /* @__PURE__ */ jsx("div", {
    className: "pt-16 min-h-screen bg-[#000000] text-slate-300",
    children: /* @__PURE__ */ jsxs("section", {
      className: "py-20 lg:py-32 relative overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row items-center gap-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "w-full lg:w-1/2 space-y-8 relative z-10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-indigo-500"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-indigo-200 tracking-wide",
                children: "Phase 03"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl lg:text-7xl font-black text-white leading-tight",
              children: ["Seamless ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400",
                children: "Integration"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-slate-400 leading-relaxed",
              children: "Deploying complex systems shouldn't disrupt your business operations. Our zero-downtime deployment strategies and robust API syncing ensure that new integrations seamlessly tie into your existing tech stack without a hitch."
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-4 flex gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]",
                children: "Consult With Us"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all",
                children: "Back to Home"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-1/2 relative z-10",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-3xl overflow-hidden border border-white/10 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors z-10"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/seamless-integration.png",
                alt: "Seamless System Integration and Deployment",
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              })]
            })
          })]
        })
      })]
    })
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: seamlessIntegration,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
function meta$7({}) {
  return [...generateMeta({
    title: "Continuous Optimization - How We Work | Aarvitek Systems",
    description: "Phase 4 of our process: Proactive monitoring, performance maintenance, and future-proofing your IT infrastructure.",
    url: "/continuous-optimization"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Continuous Optimization",
    item: "/continuous-optimization"
  }]))];
}
const continuousOptimization = UNSAFE_withComponentProps(function ContinuousOptimization() {
  return /* @__PURE__ */ jsx("div", {
    className: "pt-16 min-h-screen bg-[#000000] text-slate-300",
    children: /* @__PURE__ */ jsxs("section", {
      className: "py-20 lg:py-32 relative overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row-reverse items-center gap-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "w-full lg:w-1/2 space-y-8 relative z-10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-emerald-500"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-emerald-200 tracking-wide",
                children: "Phase 04"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl lg:text-7xl font-black text-white leading-tight",
              children: ["Continuous ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400",
                children: "Optimization"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-slate-400 leading-relaxed",
              children: "Our job doesn't end at launch. We provide ongoing monitoring, proactive maintenance, and continuous optimization to ensure your systems are consistently high-performing, secure, and future-proofed against evolving technologies."
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-4 flex gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]",
                children: "Consult With Us"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all",
                children: "Back to Home"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-1/2 relative z-10",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-3xl overflow-hidden border border-white/10 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors z-10"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/continuous-optimization.png",
                alt: "Continuous Performance Optimization",
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              })]
            })
          })]
        })
      })]
    })
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: continuousOptimization,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  return [...generateMeta({
    title: "Enhanced Productivity | Aarvitek Systems",
    description: "Automate repetitive tasks and focus on high-impact strategies with our custom IT and automation solutions.",
    url: "/enhanced-productivity"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Enhanced Productivity",
    item: "/enhanced-productivity"
  }]))];
}
const enhancedProductivity = UNSAFE_withComponentProps(function EnhancedProductivity() {
  return /* @__PURE__ */ jsx("div", {
    className: "pt-16 min-h-screen bg-[#000000] text-slate-300",
    children: /* @__PURE__ */ jsxs("section", {
      className: "py-20 lg:py-32 relative overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row items-center gap-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "w-full lg:w-1/2 space-y-8 relative z-10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-purple-500"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-purple-200 tracking-wide",
                children: "Business Benefit"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl lg:text-7xl font-black text-white leading-tight",
              children: ["Enhanced ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400",
                children: "Productivity"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-slate-400 leading-relaxed",
              children: "We help automate repetitive manual tasks so your team can focus on complex, high-impact strategies. By leveraging AI and modern web architecture, we reduce bottlenecks and empower your workforce to achieve more in less time."
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-4 flex gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]",
                children: "Automate Now"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all",
                children: "Back to Home"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-1/2 relative z-10",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-3xl overflow-hidden border border-white/10 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-colors z-10"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/agile-development.png",
                alt: "Enhanced Productivity and Automation",
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              })]
            })
          })]
        })
      })]
    })
  });
});
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: enhancedProductivity,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  return [...generateMeta({
    title: "Infinite Scalability | Aarvitek Systems",
    description: "Build architectures designed to handle massive traffic spikes and scale seamlessly as your business grows.",
    url: "/scalability"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Scalability",
    item: "/scalability"
  }]))];
}
const scalability = UNSAFE_withComponentProps(function Scalability() {
  return /* @__PURE__ */ jsx("div", {
    className: "pt-16 min-h-screen bg-[#000000] text-slate-300",
    children: /* @__PURE__ */ jsxs("section", {
      className: "py-20 lg:py-32 relative overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row-reverse items-center gap-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "w-full lg:w-1/2 space-y-8 relative z-10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-blue-500"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-blue-200 tracking-wide",
                children: "Business Benefit"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl lg:text-7xl font-black text-white leading-tight",
              children: ["Infinite ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400",
                children: "Scalability"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-slate-400 leading-relaxed",
              children: "Don't let your technology hold you back. We build architectures designed to handle massive traffic spikes without breaking a sweat, ensuring your platform scales seamlessly as your user base grows globally."
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-4 flex gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]",
                children: "Scale With Us"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all",
                children: "Back to Home"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-1/2 relative z-10",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-3xl overflow-hidden border border-white/10 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors z-10"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/seamless-integration.png",
                alt: "Server Scalability and Cloud Architecture",
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              })]
            })
          })]
        })
      })]
    })
  });
});
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: scalability,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [...generateMeta({
    title: "Cost Efficient IT Solutions | Aarvitek Systems",
    description: "Reduce manual labor and server costs through optimized tech stacks and automated workflows. Improve your bottom line.",
    url: "/cost-efficient"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Cost Efficient",
    item: "/cost-efficient"
  }]))];
}
const costEfficient = UNSAFE_withComponentProps(function CostEfficient() {
  return /* @__PURE__ */ jsx("div", {
    className: "pt-16 min-h-screen bg-[#000000] text-slate-300",
    children: /* @__PURE__ */ jsxs("section", {
      className: "py-20 lg:py-32 relative overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row items-center gap-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "w-full lg:w-1/2 space-y-8 relative z-10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-emerald-500"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-emerald-200 tracking-wide",
                children: "Business Benefit"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl lg:text-7xl font-black text-white leading-tight",
              children: ["Cost ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400",
                children: "Efficient"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-slate-400 leading-relaxed",
              children: "Reduce unnecessary expenses by modernizing your tech stack. Optimized databases, streamlined cloud operations, and automated workflows mean you spend less on server costs and manual labor, massively improving your bottom line."
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-4 flex gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]",
                children: "Optimize Costs"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all",
                children: "Back to Home"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-1/2 relative z-10",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-3xl overflow-hidden border border-white/10 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors z-10"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/continuous-optimization.png",
                alt: "Cost Efficiency and Optimization",
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              })]
            })
          })]
        })
      })]
    })
  });
});
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: costEfficient,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [...generateMeta({
    title: "24/7 Availability & Resilient Systems | Aarvitek Systems",
    description: "We build resilient systems with robust failovers that run flawlessly around the clock, ensuring business continuity.",
    url: "/availability"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Availability",
    item: "/availability"
  }]))];
}
const availability = UNSAFE_withComponentProps(function Availability() {
  return /* @__PURE__ */ jsx("div", {
    className: "pt-16 min-h-screen bg-[#000000] text-slate-300",
    children: /* @__PURE__ */ jsxs("section", {
      className: "py-20 lg:py-32 relative overflow-hidden",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-[100%] pointer-events-none"
      }), /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row-reverse items-center gap-16",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "w-full lg:w-1/2 space-y-8 relative z-10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-2 w-2 rounded-full bg-indigo-500"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm font-medium text-indigo-200 tracking-wide",
                children: "Business Benefit"
              })]
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-5xl lg:text-7xl font-black text-white leading-tight",
              children: ["24/7 ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400",
                children: "Availability"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-slate-400 leading-relaxed",
              children: "Business doesn't sleep, and neither should your platform. We build resilient systems with robust failovers that run flawlessly around the clock, ensuring business continuity and peace of mind."
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-4 flex gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]",
                children: "Ensure Uptime"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/",
                className: "px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all",
                children: "Back to Home"
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-1/2 relative z-10",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative rounded-3xl overflow-hidden border border-white/10 group",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors z-10"
              }), /* @__PURE__ */ jsx("img", {
                src: "/images/smart-analyzing.png",
                alt: "24/7 Availability and Resilience",
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              })]
            })
          })]
        })
      })]
    })
  });
});
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: availability,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [...generateMeta({
    title: "Our Office Locations & Localized IT Services | Aarvitek Systems",
    description: "Explore Aarvitek Systems' operations across major Indian tech and business hubs. Delivering custom web development, e-commerce, and creative solutions.",
    url: "/locations"
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Locations",
    item: "/locations"
  }]))];
}
const CITIES = [{
  slug: "bangalore",
  name: "Bangalore (Bengaluru)",
  highlight: "India's Silicon Valley",
  tagline: "High-performance tech & startup software.",
  description: "Powering startups and scale-ups with robust React/Node platforms, scalable e-commerce systems, and advanced cloud integrations.",
  services: ["Web Development", "E-Commerce", "UI/UX Design"]
}, {
  slug: "mumbai",
  name: "Mumbai",
  highlight: "Financial Capital",
  tagline: "Enterprise-grade web & security architectures.",
  description: "Delivering secure transactional banking systems, fintech solutions, corporate portals, and enterprise branding.",
  services: ["Enterprise Web", "Cyber Security", "Corporate Branding"]
}, {
  slug: "delhi",
  name: "Delhi NCR",
  highlight: "Corporate & Brand Hub",
  tagline: "High-conversion web design & SEO systems.",
  description: "Helping brands, retail enterprises, and services capture market share with lead-generation designs and search authority.",
  services: ["Website Design", "Graphic Design", "Local SEO"]
}, {
  slug: "hyderabad",
  name: "Hyderabad",
  highlight: "SaaS & Biotech Center",
  tagline: "Multi-tenant cloud applications & API setups.",
  description: "Engineering multi-tenant dashboards, complex database systems, and custom API layers for modern tech companies.",
  services: ["SaaS Architecture", "API Integration", "Web Portals"]
}, {
  slug: "pune",
  name: "Pune",
  highlight: "Engineering & Tech Hub",
  tagline: "Precision design & industrial product catalogs.",
  description: "Supporting manufacturing leaders, automotive partners, and tech firms with corporate portals and UX excellence.",
  services: ["UI/UX Prototyping", "Corporate Portals", "Product Catalogs"]
}, {
  slug: "chennai",
  name: "Chennai",
  highlight: "SaaS Export Powerhouse",
  tagline: "Developer-friendly software & video production.",
  description: "Designing modern product interfaces, custom databases, and high-impact marketing videos for SaaS products.",
  services: ["SaaS Development", "Video Editing", "Creative Assets"]
}];
const locations = UNSAFE_withComponentProps(function Locations() {
  const containerRef = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".locations-animate", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });
  }, {
    scope: containerRef
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: containerRef,
    className: "min-h-screen bg-[#020202] text-slate-300 overflow-hidden pt-28 pb-20 relative",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff03_1px,_transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none"
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center max-w-3xl mx-auto mb-16 locations-animate",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-6",
          children: [/* @__PURE__ */ jsx("span", {
            className: "flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"
          }), /* @__PURE__ */ jsx("span", {
            className: "text-xs font-semibold text-purple-200 tracking-wider uppercase",
            children: "Strategic Regional Footprint"
          })]
        }), /* @__PURE__ */ jsxs("h1", {
          className: "text-4xl sm:text-5xl font-black text-white mb-6 leading-tight",
          children: ["Our Regional ", /* @__PURE__ */ jsx("span", {
            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400",
            children: "Business Hubs"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "text-base sm:text-lg text-slate-400 leading-relaxed",
          children: "We deliver customized, high-performance IT solutions tailored to the local market needs of India's leading startup, commercial, and financial ecosystems."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 locations-animate",
        children: CITIES.map((city) => /* @__PURE__ */ jsxs(Link, {
          to: `/locations/${city.slug}`,
          className: "group relative rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-purple-500/20 p-8 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(168,85,247,0.05)]",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute inset-0 bg-gradient-to-br from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/5 group-hover:to-indigo-600/5 rounded-2xl transition-all duration-300 pointer-events-none"
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20",
              children: city.highlight
            }), /* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-bold text-white mt-6 group-hover:text-purple-300 transition-colors",
              children: city.name
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm font-semibold text-slate-300 mt-2",
              children: city.tagline
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-slate-400 mt-4 leading-relaxed line-clamp-3",
              children: city.description
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-8 pt-6 border-t border-white/5",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex flex-wrap gap-1.5 mb-6",
              children: city.services.map((svc) => /* @__PURE__ */ jsx("span", {
                className: "text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-slate-400",
                children: svc
              }, svc))
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors",
              children: [/* @__PURE__ */ jsx("span", {
                children: "Explore localized services"
              }), /* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2.5",
                  d: "M9 5l7 7-7 7"
                })
              })]
            })]
          })]
        }, city.slug))
      })]
    })]
  });
});
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: locations,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const CITIES_DATA = {
  bangalore: {
    slug: "bangalore",
    name: "Bangalore",
    metaTitle: "Web Development & IT Solutions in Bangalore - Aarvitek Systems",
    metaDescription: "Scale your startup or enterprise with expert web development, mobile-responsive design, and cloud systems in Bangalore. India's Silicon Valley.",
    headline: "Scale Your Technology in India's Silicon Valley",
    subtitle: "From Koramangala and Indiranagar startups to Whitefield and Electronic City enterprises, we build world-class web applications, robust e-commerce setups, and custom digital experiences.",
    highlight: "Tech & Startups Hub",
    stats: [{
      label: "Tech Partners",
      value: "25+"
    }, {
      label: "Local Engineers",
      value: "15+"
    }, {
      label: "Average Launch Time",
      value: "4 Weeks"
    }],
    serviceFocus: "Bangalore's fast-paced tech ecosystem demands high-performance, scalable web systems. We specialize in custom React/Node.js stacks, high-performance e-commerce portals, and modern UI/UX design that stands out in the competitive startup market. We optimize codebases for speed, cloud architecture, and smooth user journeys.",
    faqs: [{
      q: "Do you offer on-site meetings for Bangalore businesses?",
      a: "Yes! We can arrange face-to-face consultations and scoping sessions at your offices in locations like Whitefield, Indiranagar, or HSR Layout to kick off your project."
    }, {
      q: "What technologies do you specialize in for Bangalore startups?",
      a: "We work with modern, scalable stacks including Next.js, React, Node.js, PostgreSQL, and AWS, ensuring your platform is ready to scale alongside your user base."
    }]
  },
  mumbai: {
    slug: "mumbai",
    name: "Mumbai",
    metaTitle: "Enterprise Web Systems & E-Commerce in Mumbai - Aarvitek Systems",
    metaDescription: "Deploy secure, enterprise-grade web applications, corporate branding, and scalable e-commerce systems tailored for businesses in Mumbai, India's financial capital.",
    headline: "Enterprise-Grade Digital Solutions for India's Financial Capital",
    subtitle: "Powering corporate brands, financial services, and retail giants in Bandra-Kurla Complex (BKC), Nariman Point, and Andheri with secure, high-traffic web architectures.",
    highlight: "Enterprise & Commerce Hub",
    stats: [{
      label: "Corporate Clients",
      value: "18+"
    }, {
      label: "Uptime SLA Guarantee",
      value: "99.99%"
    }, {
      label: "Security Audited",
      value: "100%"
    }],
    serviceFocus: "In Mumbai, security, reliability, and transaction volume are paramount. We deliver secure payment gateway integrations, compliance-ready financial portals, and robust enterprise applications designed to handle millions of requests without dropping a frame.",
    faqs: [{
      q: "Can you design enterprise portals compliant with security standards?",
      a: "Absolutely. We build all enterprise solutions with secure-by-design principles, implementing robust encryption, session management, and strict access controls."
    }, {
      q: "What is your support lifecycle for Mumbai corporates?",
      a: "We provide comprehensive service-level agreements (SLAs) including 24/7 server monitoring, regular dependency updates, and rapid bug resolution."
    }]
  },
  delhi: {
    slug: "delhi",
    name: "Delhi NCR",
    metaTitle: "Custom Web Solutions & Branding in Delhi NCR - Aarvitek Systems",
    metaDescription: "Maximize search presence and client conversions with premium web design, SEO, and corporate graphics in Delhi, Gurgaon, and Noida.",
    headline: "Grow Your Brand Presence in the Capital Region",
    subtitle: "Helping premium brands, retail businesses, and fast-growing services in Connaught Place, Gurgaon Cyber City, and Noida Sector 62 capture regional markets with high-conversion web designs.",
    highlight: "Corporate & Brand Hub",
    stats: [{
      label: "Local Brands Scaled",
      value: "30+"
    }, {
      label: "SEO Traffic Growth",
      value: "150%+"
    }, {
      label: "Design Awards",
      value: "3"
    }],
    serviceFocus: "Delhi NCR's competitive landscape requires highly optimized search presence and conversion-focused designs. We craft bespoke graphics, search-optimized web architectures, and lead-generation funnels that turn searchers into local customers.",
    faqs: [{
      q: "Do you specialize in local SEO for Delhi NCR?",
      a: "Yes, we integrate Schema markups, local listings, and geo-targeted keywords into your web architecture so your business ranks high for local search intents."
    }, {
      q: "What is your average timeline for corporate site design?",
      a: "Corporate website design and development typically ranges between 3 to 6 weeks, depending on content structure and customized graphics requirements."
    }]
  },
  hyderabad: {
    slug: "hyderabad",
    name: "Hyderabad",
    metaTitle: "SaaS Web Development & IT Services in Hyderabad - Aarvitek Systems",
    metaDescription: "Accelerate your SaaS growth and corporate systems with high-performance web engineering and interactive design in Hyderabad, Cyberabad.",
    headline: "Accelerating Innovation in Cyberabad",
    subtitle: "Custom SaaS dashboards, API integrations, and robust cloud applications built for tech companies and healthcare leaders in HITEC City and Gachibowli.",
    highlight: "SaaS & Biotech Hub",
    stats: [{
      label: "SaaS Platforms",
      value: "12"
    }, {
      label: "API Integrations",
      value: "200+"
    }, {
      label: "Agile Sprints Done",
      value: "500+"
    }],
    serviceFocus: "Hyderabad is a major SaaS and technology hub. We build secure multi-tenant dashboard architectures, automate workflows with custom APIs, and implement real-time analytics panels that power modern cloud services.",
    faqs: [{
      q: "Do you build multi-tenant SaaS dashboards?",
      a: "Yes, we have deep experience designing secure multi-tenant database layouts and user authentication models (RBAC) to ensure client data isolation."
    }, {
      q: "How do you handle API documentation and handoff?",
      a: "We write clean, OpenAPI-compliant documentation (Swagger) for all custom APIs we build, making front-end and third-party integrations simple."
    }]
  },
  pune: {
    slug: "pune",
    name: "Pune",
    metaTitle: "Creative UI/UX Design & Web Systems in Pune - Aarvitek Systems",
    metaDescription: "Modern web portals, industrial product sites, and digital marketing systems engineered for Pune's manufacturing and tech sectors.",
    headline: "Engineering Excellence in India's Motor & Tech Hub",
    subtitle: "From Hinjewadi IT parks to Hadapsar industrial zones, we design conversion-driven websites, custom product catalogs, and creative branding.",
    highlight: "Industrial & Education Hub",
    stats: [{
      label: "Industrial Partners",
      value: "14+"
    }, {
      label: "UI/UX Prototypes",
      value: "80+"
    }, {
      label: "Support Resolution",
      value: "99.2%"
    }],
    serviceFocus: "Pune blends academic depth with industrial strength. We construct high-end corporate websites, complex catalog portals, and specialized product showcases that communicate quality and engineering precision.",
    faqs: [{
      q: "Can you rebuild our legacy industrial catalog site?",
      a: "Yes, we modernize slow, legacy websites into fast, responsive web systems that allow visitors to filter and search catalogs instantly."
    }, {
      q: "Do you design complete brand identity kits?",
      a: "We offer complete graphic design packages including logos, brand books, collateral, and marketing presentation decks."
    }]
  },
  chennai: {
    slug: "chennai",
    name: "Chennai",
    metaTitle: "SaaS Platform Engineering & Web Portals in Chennai - Aarvitek Systems",
    metaDescription: "Premium web platforms, enterprise software UI, and creative video marketing solutions for Chennai's tech and automotive leaders.",
    headline: "Robust Digital Architecture for India's SaaS Capital",
    subtitle: "Designing high-performance web systems and engaging video production for SaaS startups and enterprise leaders in OMR and T-Nagar.",
    highlight: "SaaS & Automotive Hub",
    stats: [{
      label: "OMR Tech Clients",
      value: "15+"
    }, {
      label: "Video Projects Done",
      value: "40+"
    }, {
      label: "Code Quality Rating",
      value: "98.7%"
    }],
    serviceFocus: "Chennai is a global SaaS export powerhouse. We design elegant, developer-friendly interface structures, construct robust backend integrations, and offer high-end video editing and digital marketing assets for SaaS product launches.",
    faqs: [{
      q: "What kind of video editing services do you provide for SaaS?",
      a: "We produce product feature walkthroughs, social media ads, case study highlight reels, and clean corporate explainer videos."
    }, {
      q: "Do you optimize platforms for global traffic?",
      a: "Yes, we implement edge caching, content delivery networks (CDNs), and asset compression so your web app loads fast from any global location."
    }]
  }
};
function loader({
  params
}) {
  const citySlug = params.city?.toLowerCase() || "";
  const city = CITIES_DATA[citySlug];
  if (!city) {
    throw new Response("City Not Found", {
      status: 404
    });
  }
  return {
    city
  };
}
function meta$1({
  data
}) {
  if (!data || !data.city) {
    return [{
      title: "City Not Found - Aarvitek Systems"
    }];
  }
  const urlPath = `/locations/${data.city.slug}`;
  const faqs = data.city.faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }));
  return [...generateMeta({
    title: data.city.metaTitle,
    description: data.city.metaDescription,
    url: urlPath
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Aarvitek Systems ${data.city.name}`,
    "image": "https://aarviteksystems.com/images/og-image.png",
    "url": `https://aarviteksystems.com${urlPath}`,
    "telephone": "+91 787 090 1336",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.city.name,
      "addressCountry": "IN"
    }
  }), generateJsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  }), generateJsonLd(getBreadcrumbSchema([{
    name: "Home",
    item: "/"
  }, {
    name: "Locations",
    item: "/locations"
  }, {
    name: data.city.name,
    item: urlPath
  }]))];
}
const locationDetail = UNSAFE_withComponentProps(function LocationDetail({
  loaderData
}) {
  const {
    city
  } = loaderData;
  const containerRef = useRef(null);
  useGSAP(() => {
    gsapWithCSS.from(".detail-fade-in", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });
  }, {
    scope: containerRef
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: containerRef,
    className: "min-h-screen bg-[#020202] text-slate-300 overflow-hidden pt-28 pb-20 relative",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-10%] left-[5%] w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10",
      children: [/* @__PURE__ */ jsx("div", {
        className: "mb-8 detail-fade-in",
        children: /* @__PURE__ */ jsxs(Link, {
          to: "/locations",
          className: "inline-flex items-center text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors",
          children: [/* @__PURE__ */ jsx("svg", {
            className: "w-4 h-4 mr-2",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: "2.5",
              d: "M15 19l-7-7 7-7"
            })
          }), "Back to Locations"]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "lg:col-span-7 space-y-6 detail-fade-in",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20",
            children: city.highlight
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-4xl sm:text-5xl font-black text-white leading-tight",
            children: city.headline
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm sm:text-base text-slate-400 leading-relaxed",
            children: city.subtitle
          }), /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-3 gap-6 pt-6 border-t border-white/5",
            children: city.stats.map((stat) => /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-2xl sm:text-3xl font-black text-white",
                children: stat.value
              }), /* @__PURE__ */ jsx("div", {
                className: "text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-wider",
                children: stat.label
              })]
            }, stat.label))
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "lg:col-span-5 detail-fade-in",
          children: /* @__PURE__ */ jsxs("div", {
            className: "relative rounded-2xl border border-white/10 overflow-hidden bg-[#070707] p-1.5 shadow-[0_0_50px_rgba(0,0,0,0.8)]",
            children: [/* @__PURE__ */ jsx("img", {
              src: "/images/location_hero_bg.png",
              alt: `${city.name} business digital hub`,
              className: "rounded-xl w-full object-cover aspect-[4/3] opacity-90 group-hover:scale-105 transition-transform duration-500"
            }), /* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"
            }), /* @__PURE__ */ jsxs("div", {
              className: "absolute bottom-6 left-6 right-6",
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-[9px] font-bold uppercase tracking-widest text-slate-400",
                children: "Regional Technology Center"
              }), /* @__PURE__ */ jsxs("h3", {
                className: "text-lg font-bold text-white mt-1",
                children: [city.name, " Office"]
              })]
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-12 py-16 border-t border-b border-white/5 mb-24 detail-fade-in",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white",
            children: "Localized Service Focus"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xs text-slate-500 mt-2",
            children: "Tailoring software, architecture, and marketing assets for specific hub demands."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "lg:col-span-2",
          children: /* @__PURE__ */ jsx("p", {
            className: "text-sm text-slate-400 leading-relaxed",
            children: city.serviceFocus
          })
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "max-w-3xl mx-auto mb-24 detail-fade-in",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold text-white text-center mb-12",
          children: "Frequently Asked Questions"
        }), /* @__PURE__ */ jsx("div", {
          className: "space-y-6",
          children: city.faqs.map((faq, idx) => /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-xl border border-white/5 bg-white/[0.01]",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-base font-bold text-white mb-2",
              children: faq.q
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-slate-400 leading-relaxed",
              children: faq.a
            })]
          }, idx))
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "max-w-4xl mx-auto text-center p-12 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-[#0c051a]/80 to-[#04010a]/80 backdrop-blur-md detail-fade-in shadow-2xl relative overflow-hidden",
        children: [/* @__PURE__ */ jsx("div", {
          className: "absolute top-[-30%] right-[-10%] w-[300px] h-[300px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative z-10 space-y-6",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl font-black text-white",
            children: ["Let's Discuss Your ", city.name, " Project"]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-slate-400 text-sm max-w-xl mx-auto leading-relaxed",
            children: "Arrange an online strategy call or meet with our engineers. We provide optimized solutions matching regional client demands."
          }), /* @__PURE__ */ jsx("div", {
            className: "pt-4",
            children: /* @__PURE__ */ jsx(Link, {
              to: "/contact",
              className: "inline-block px-8 py-3.5 rounded-full bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]",
              children: "Get in touch"
            })
          })]
        })]
      })]
    })]
  });
});
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: locationDetail,
  loader,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [
    {
      title: "Bespoke Web Development & High-Converting Websites - Aarvitek Systems"
    },
    {
      name: "description",
      content: "Get a high-performance, custom website built by certified experts. Maximize your business conversions, speed, and design. Get a free proposal in 24 hours."
    },
    {
      name: "robots",
      content: "noindex, nofollow"
    }
    // Keeps search engines from indexing promo pages as main site content
  ];
}
const promo = UNSAFE_withComponentProps(function PromoLanding() {
  const containerRef = useRef(null);
  const formSectionRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("web-dev");
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calcType, setCalcType] = useState("standard");
  const [pageCount, setPageCount] = useState(5);
  const [features, setFeatures] = useState(["seo", "responsive"]);
  const calculatePrice = () => {
    let base = 0;
    if (calcType === "standard") base = 12e3;
    else if (calcType === "ecommerce") base = 25e3;
    else base = 4e4;
    let pageCost = pageCount * 1200;
    let featureCost = features.length * 2500;
    return base + pageCost + featureCost;
  };
  const toggleFeature = (feat) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };
  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  useGSAP(() => {
    gsapWithCSS.from(".promo-animate", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out"
    });
  }, {
    scope: containerRef
  });
  return /* @__PURE__ */ jsxs("div", {
    ref: containerRef,
    className: "min-h-screen bg-[#020202] text-slate-300 font-sans antialiased relative",
    children: [/* @__PURE__ */ jsx("div", {
      className: "absolute top-[-5%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute bottom-[5%] left-[10%] w-[450px] h-[450px] bg-pink-600/5 blur-[120px] rounded-full pointer-events-none"
    }), /* @__PURE__ */ jsx("div", {
      className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff02_1px,_transparent_1px)] bg-[size:30px_30px] pointer-events-none"
    }), /* @__PURE__ */ jsx("header", {
      className: "relative z-50 border-b border-white/5 bg-black/40 backdrop-blur-md",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between",
        children: [/* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "flex items-center gap-2.5",
          children: /* @__PURE__ */ jsxs("span", {
            className: "text-xl font-black text-white tracking-wider flex items-center",
            children: ["AARVITEK", /* @__PURE__ */ jsx("span", {
              className: "h-2 w-2 rounded-full bg-purple-500 ml-1.5 animate-pulse"
            })]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-6",
          children: [/* @__PURE__ */ jsxs("a", {
            href: "tel:+917870901336",
            className: "hidden sm:flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors",
            children: [/* @__PURE__ */ jsx("svg", {
              className: "w-4 h-4 text-purple-400",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "2.5",
                d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              })
            }), /* @__PURE__ */ jsx("span", {
              children: "+91 787 090 1336"
            })]
          }), /* @__PURE__ */ jsx("button", {
            onClick: scrollToForm,
            className: "px-5 py-2.5 rounded-full bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]",
            children: "Claim Free Proposal"
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "relative pt-12 pb-20 lg:pt-20 lg:pb-32 z-10",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-7 space-y-8 promo-animate",
            children: [/* @__PURE__ */ jsx("div", {
              className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm",
              children: /* @__PURE__ */ jsx("span", {
                className: "text-[10px] font-bold text-purple-300 uppercase tracking-widest",
                children: "🔥 Limited Time Offer"
              })
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight",
              children: ["We Build Websites That ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400",
                children: "Convert Visitors"
              }), " Into Buyers"]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl",
              children: "Forget slow page speeds and generic WordPress templates. We engineer bespoke, lightning-fast React, Shopify, and Node web applications built to capture attention, build trust, and maximize your sales revenue."
            }), /* @__PURE__ */ jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4",
              children: ["Custom UI/UX (Zero generic templates)", "90+ Google PageSpeed Score guaranteed", "SEO & Conversion Rate Optimized", "Integrated Analytics & Meta Pixels Setup"].map((tick, i) => /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-3",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-purple-400 shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "3",
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-xs font-semibold text-slate-200",
                  children: tick
                })]
              }, i))
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-8 border-t border-white/5",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4",
                children: "Trusted Technology Standards"
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex flex-wrap gap-6 items-center opacity-40",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-sm font-bold text-white tracking-widest",
                  children: "REACT"
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-sm font-bold text-white tracking-widest",
                  children: "SHOPIFY"
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-sm font-bold text-white tracking-widest",
                  children: "AWS"
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-sm font-bold text-white tracking-widest",
                  children: "NEXTJS"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            ref: formSectionRef,
            className: "lg:col-span-5 promo-animate",
            children: /* @__PURE__ */ jsxs("div", {
              className: "rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-2xl relative",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 px-3.5 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-wider shadow-md",
                children: "Free wireframe included"
              }), !isSubmitted ? /* @__PURE__ */ jsxs("form", {
                onSubmit: handleSubmit,
                className: "space-y-5",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "text-lg font-bold text-white",
                    children: "Get a Custom Proposal"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-xs text-slate-400 mt-1",
                    children: "Submit your details and get an estimate and wireframe concept in 24 hours."
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-4",
                  children: [/* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("label", {
                      className: "block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5",
                      children: "Your Name"
                    }), /* @__PURE__ */ jsx("input", {
                      type: "text",
                      required: true,
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      placeholder: "John Doe",
                      className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                    children: [/* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("label", {
                        className: "block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5",
                        children: "Email Address"
                      }), /* @__PURE__ */ jsx("input", {
                        type: "email",
                        required: true,
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: "john@company.com",
                        className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                      })]
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("label", {
                        className: "block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5",
                        children: "Phone Number"
                      }), /* @__PURE__ */ jsx("input", {
                        type: "tel",
                        required: true,
                        value: phone,
                        onChange: (e) => setPhone(e.target.value),
                        placeholder: "+91 99999 99999",
                        className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("label", {
                      className: "block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5",
                      children: "What do you need built?"
                    }), /* @__PURE__ */ jsxs("select", {
                      value: service,
                      onChange: (e) => setService(e.target.value),
                      className: "w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 transition-all",
                      children: [/* @__PURE__ */ jsx("option", {
                        value: "web-dev",
                        children: "Bespoke Website Development"
                      }), /* @__PURE__ */ jsx("option", {
                        value: "ecommerce",
                        children: "Shopify / E-Commerce Store"
                      }), /* @__PURE__ */ jsx("option", {
                        value: "custom-app",
                        children: "Custom Web Application"
                      }), /* @__PURE__ */ jsx("option", {
                        value: "ui-ux",
                        children: "UI/UX Redesign & Graphic Pack"
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("label", {
                      className: "block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5",
                      children: "Brief details (optional)"
                    }), /* @__PURE__ */ jsx("textarea", {
                      value: details,
                      onChange: (e) => setDetails(e.target.value),
                      placeholder: "Tell us about your brand goals...",
                      rows: 3,
                      className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all resize-none"
                    })]
                  })]
                }), /* @__PURE__ */ jsx("button", {
                  type: "submit",
                  className: "w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]",
                  children: "Claim My Free Proposal →"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-[9px] text-center text-slate-500",
                  children: "🔒 We respect your privacy. Zero spam guaranteed."
                })]
              }) : /* @__PURE__ */ jsxs("div", {
                className: "text-center py-12 space-y-6",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center justify-center mx-auto",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-8 h-8 text-purple-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "3",
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-2",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "text-xl font-bold text-white",
                    children: "Proposal Claimed!"
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-xs text-slate-400 max-w-sm mx-auto leading-relaxed",
                    children: ["Thank you, ", name, ". Our solutions engineers are reviewing your request. We will reach out to you within 24 hours at ", /* @__PURE__ */ jsx("strong", {
                      children: email
                    }), "."]
                  })]
                })]
              })]
            })
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 border-t border-white/5 bg-[#040404]",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-[10px] font-bold text-purple-400 uppercase tracking-widest",
            children: "Interactive Calculator"
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-black text-white mt-4",
            children: "Estimate Your Web Project"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xs text-slate-500 mt-2",
            children: "Adjust details dynamically to estimate project value instantly."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/[0.01] border border-white/5 p-8 rounded-3xl backdrop-blur-sm",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "md:col-span-7 space-y-6",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3",
                children: "Project Class"
              }), /* @__PURE__ */ jsx("div", {
                className: "grid grid-cols-3 gap-3",
                children: ["standard", "ecommerce", "custom"].map((type) => /* @__PURE__ */ jsx("button", {
                  onClick: () => setCalcType(type),
                  className: `py-3.5 px-2 rounded-xl border text-center text-xs font-bold uppercase transition-all ${calcType === type ? "bg-purple-600 border-purple-500 text-white" : "bg-white/5 border-white/10 text-slate-400 hover:text-white"}`,
                  children: type === "standard" ? "Corporate" : type === "ecommerce" ? "E-Com Store" : "Custom Web"
                }, type))
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex justify-between items-center mb-3",
                children: [/* @__PURE__ */ jsx("label", {
                  className: "text-[10px] font-mono uppercase tracking-wider text-slate-400",
                  children: "Total Page Templates"
                }), /* @__PURE__ */ jsxs("span", {
                  className: "text-sm font-bold text-white",
                  children: [pageCount, " Pages"]
                })]
              }), /* @__PURE__ */ jsx("input", {
                type: "range",
                min: 1,
                max: 25,
                value: pageCount,
                onChange: (e) => setPageCount(parseInt(e.target.value)),
                className: "w-full accent-purple-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3",
                children: "Include Integration Add-ons"
              }), /* @__PURE__ */ jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                children: [{
                  id: "seo",
                  label: "Structured Schema & Meta SEO"
                }, {
                  id: "responsive",
                  label: "Advanced Responsive Testing"
                }, {
                  id: "cms",
                  label: "Custom Content Manager (CMS)"
                }, {
                  id: "pixel",
                  label: "Tracking Pixels & Analytics"
                }].map((feat) => /* @__PURE__ */ jsxs("button", {
                  onClick: () => toggleFeature(feat.id),
                  className: `p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${features.includes(feat.id) ? "bg-purple-500/10 border-purple-500/40 text-purple-200" : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"}`,
                  children: [/* @__PURE__ */ jsx("span", {
                    children: feat.label
                  }), features.includes(feat.id) && /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-purple-400",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "3",
                      d: "M5 13l4 4L19 7"
                    })
                  })]
                }, feat.id))
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "md:col-span-5 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-8 flex flex-col justify-center items-center text-center space-y-6",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("span", {
                className: "text-[10px] font-mono uppercase tracking-widest text-slate-500",
                children: "Estimated Value Setup"
              }), /* @__PURE__ */ jsxs("div", {
                className: "text-4xl sm:text-5xl font-black text-white mt-2",
                children: ["₹", calculatePrice().toLocaleString("en-IN")]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-[10px] text-slate-500 mt-2",
                children: "Includes design, markup code, and initial setup handoff."
              })]
            }), /* @__PURE__ */ jsx("button", {
              onClick: scrollToForm,
              className: "px-6 py-3.5 w-full rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg",
              children: "Lock in this estimate →"
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 relative",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-[10px] font-bold text-purple-400 uppercase tracking-widest",
            children: "Work Portfolio"
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-black text-white mt-4",
            children: "Built For Speed & Performance"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center",
          children: [/* @__PURE__ */ jsx("div", {
            className: "lg:col-span-7",
            children: /* @__PURE__ */ jsx("div", {
              className: "relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0c] p-2",
              children: /* @__PURE__ */ jsx("img", {
                src: "/images/landing_promo_hero.png",
                alt: "Analytics dashboard platform",
                className: "rounded-xl w-full object-cover opacity-95 aspect-[16/10]"
              })
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-5 space-y-6",
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded",
              children: "E-COMMERCE METRIC SUCCESS"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-white",
              children: "Modern Enterprise Redesign"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-slate-400 leading-relaxed",
              children: "We redesigned a leading retail platform into a fast, headless Next.js architecture. The result was a 1.2s page load speed improvement and a 42% increase in sales conversion within the first 30 days."
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-2 gap-4 pt-4 border-t border-white/5",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-xl font-bold text-white",
                  children: "1.2s"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-[9px] font-mono text-slate-500 uppercase",
                  children: "Load Time Saved"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-xl font-bold text-white",
                  children: "+42%"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-[9px] font-mono text-slate-500 uppercase",
                  children: "Conversion Growth"
                })]
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "pt-4",
              children: /* @__PURE__ */ jsxs("button", {
                onClick: scrollToForm,
                className: "text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center",
                children: ["Build a platform like this", /* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 ml-1.5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2.5",
                    d: "M9 5l7 7-7 7"
                  })
                })]
              })
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24 border-t border-white/5 bg-[#030303]",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-[10px] font-bold text-purple-400 uppercase tracking-widest",
            children: "Execution Path"
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-black text-white mt-4",
            children: "Our 4-Step Development Map"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-4 gap-8",
          children: [{
            step: "01",
            name: "Strategic Plan",
            desc: "Define user objectives, design mapping, content architecture, and tech selection."
          }, {
            step: "02",
            name: "Bespoke Design",
            desc: "Construct fully custom layout mockups that align with corporate conversion goals."
          }, {
            step: "03",
            name: "Clean Coding",
            desc: "Write responsive code using high-end frameworks to ensure fast browser load times."
          }, {
            step: "04",
            name: "Launch & QC",
            desc: "Comprehensive testing, meta tags configuration, analytics setup, and production release."
          }].map((proc, i) => /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-purple-500/20 transition-all flex flex-col justify-between",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("div", {
                className: "text-2xl font-black text-purple-500/60 font-mono",
                children: proc.step
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-base font-bold text-white mt-4",
                children: proc.name
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-slate-400 mt-4 leading-relaxed",
              children: proc.desc
            })]
          }, i))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-24",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-black text-white text-center mb-12",
          children: "Frequently Asked Questions"
        }), /* @__PURE__ */ jsx("div", {
          className: "space-y-6",
          children: [{
            q: "How long does it take to launch a custom web project?",
            a: "Most custom business landing pages and corporate sites are completed in 3 to 4 weeks. High-end e-commerce setups and large-scale applications usually range between 4 to 8 weeks."
          }, {
            q: "Do I own the complete code and design files?",
            a: "Yes. Upon project handoff and final payment settlement, you retain 100% intellectual property ownership of the source code, design assets, and database schemas."
          }, {
            q: "What support SLA packages do you offer post-launch?",
            a: "We provide comprehensive security patch support, uptime monitoring, and content maintenance agreements (monthly or custom retainer model)."
          }].map((faq, i) => /* @__PURE__ */ jsxs("div", {
            className: "p-6 rounded-xl border border-white/5 bg-white/[0.01]",
            children: [/* @__PURE__ */ jsx("h4", {
              className: "text-sm font-bold text-white mb-2",
              children: faq.q
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xs text-slate-400 leading-relaxed",
              children: faq.a
            })]
          }, i))
        })]
      })
    }), /* @__PURE__ */ jsx("footer", {
      className: "py-12 border-t border-white/5 bg-[#010101]",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6",
        children: [/* @__PURE__ */ jsxs("p", {
          className: "text-xs text-slate-500",
          children: ["© ", (/* @__PURE__ */ new Date()).getFullYear(), " Aarvitek Systems. All rights reserved."]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-6",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/privacy-policy",
            className: "text-xs text-slate-500 hover:text-slate-300 transition-colors",
            children: "Privacy Policy"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/terms",
            className: "text-xs text-slate-500 hover:text-slate-300 transition-colors",
            children: "Terms of Service"
          })]
        })]
      })
    })]
  });
});
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: promo,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BT4-KF5v.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-WxvP3-3J.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js", "/assets/index-BJLytLig.js"], "css": ["/assets/root-CxlUYPP7.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-mx3Ox1Eq.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-C5AsEZGJ.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/director-message": { "id": "routes/director-message", "parentId": "root", "path": "director-message", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/director-message-erttXYmd.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-D3pxqUAX.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/clients": { "id": "routes/clients", "parentId": "root", "path": "clients", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/clients-DwcXcmea.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/career": { "id": "routes/career", "parentId": "root", "path": "career", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/career-_F_SyL5q.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/portfolio": { "id": "routes/portfolio", "parentId": "root", "path": "portfolio", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/portfolio-9Rfl1B-f.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/web-development": { "id": "routes/web-development", "parentId": "root", "path": "web-development", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/web-development-BqGuaI14.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/website-design": { "id": "routes/website-design", "parentId": "root", "path": "website-design", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/website-design-CX1EF4Uc.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/graphic-design": { "id": "routes/graphic-design", "parentId": "root", "path": "graphic-design", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/graphic-design-B8fLJstQ.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/ecommerce": { "id": "routes/ecommerce", "parentId": "root", "path": "ecommerce", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ecommerce-Ci5YlDbw.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/privacy-policy": { "id": "routes/privacy-policy", "parentId": "root", "path": "privacy-policy", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/privacy-policy-z-Xo6Bws.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/terms": { "id": "routes/terms", "parentId": "root", "path": "terms", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/terms-u8INQ0KV.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/video-editing": { "id": "routes/video-editing", "parentId": "root", "path": "video-editing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/video-editing-BJyLqtrH.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/ScrollTrigger-CB6UHAJl.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/smart-analyzing": { "id": "routes/smart-analyzing", "parentId": "root", "path": "smart-analyzing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/smart-analyzing-C6jRtx9I.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/agile-development": { "id": "routes/agile-development", "parentId": "root", "path": "agile-development", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/agile-development-CE_kUQUN.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/seamless-integration": { "id": "routes/seamless-integration", "parentId": "root", "path": "seamless-integration", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/seamless-integration-Dq1ys1zo.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/continuous-optimization": { "id": "routes/continuous-optimization", "parentId": "root", "path": "continuous-optimization", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/continuous-optimization-CyfwCbcD.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/enhanced-productivity": { "id": "routes/enhanced-productivity", "parentId": "root", "path": "enhanced-productivity", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/enhanced-productivity-BNQwPHVy.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/scalability": { "id": "routes/scalability", "parentId": "root", "path": "scalability", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/scalability-2Zc26eEB.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/cost-efficient": { "id": "routes/cost-efficient", "parentId": "root", "path": "cost-efficient", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/cost-efficient-CNWZ4fFf.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/availability": { "id": "routes/availability", "parentId": "root", "path": "availability", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/availability-BENY6d6T.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/locations": { "id": "routes/locations", "parentId": "root", "path": "locations", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/locations-C5zlrOEl.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/location-detail": { "id": "routes/location-detail", "parentId": "root", "path": "locations/:city", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/location-detail-D07sx8iD.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js", "/assets/seo-config-DeU6Y2Nk.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/promo": { "id": "routes/promo", "parentId": "root", "path": "promo", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/promo-CyqtfYAB.js", "imports": ["/assets/chunk-WWGJGFF6-jZa-PEke.js", "/assets/index-BJLytLig.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-046d0d8b.js", "version": "046d0d8b", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/director-message": {
    id: "routes/director-message",
    parentId: "root",
    path: "director-message",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/clients": {
    id: "routes/clients",
    parentId: "root",
    path: "clients",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/career": {
    id: "routes/career",
    parentId: "root",
    path: "career",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/portfolio": {
    id: "routes/portfolio",
    parentId: "root",
    path: "portfolio",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/web-development": {
    id: "routes/web-development",
    parentId: "root",
    path: "web-development",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/website-design": {
    id: "routes/website-design",
    parentId: "root",
    path: "website-design",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/graphic-design": {
    id: "routes/graphic-design",
    parentId: "root",
    path: "graphic-design",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/ecommerce": {
    id: "routes/ecommerce",
    parentId: "root",
    path: "ecommerce",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/privacy-policy": {
    id: "routes/privacy-policy",
    parentId: "root",
    path: "privacy-policy",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/terms": {
    id: "routes/terms",
    parentId: "root",
    path: "terms",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/video-editing": {
    id: "routes/video-editing",
    parentId: "root",
    path: "video-editing",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/smart-analyzing": {
    id: "routes/smart-analyzing",
    parentId: "root",
    path: "smart-analyzing",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/agile-development": {
    id: "routes/agile-development",
    parentId: "root",
    path: "agile-development",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/seamless-integration": {
    id: "routes/seamless-integration",
    parentId: "root",
    path: "seamless-integration",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/continuous-optimization": {
    id: "routes/continuous-optimization",
    parentId: "root",
    path: "continuous-optimization",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/enhanced-productivity": {
    id: "routes/enhanced-productivity",
    parentId: "root",
    path: "enhanced-productivity",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/scalability": {
    id: "routes/scalability",
    parentId: "root",
    path: "scalability",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/cost-efficient": {
    id: "routes/cost-efficient",
    parentId: "root",
    path: "cost-efficient",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/availability": {
    id: "routes/availability",
    parentId: "root",
    path: "availability",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/locations": {
    id: "routes/locations",
    parentId: "root",
    path: "locations",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/location-detail": {
    id: "routes/location-detail",
    parentId: "root",
    path: "locations/:city",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/promo": {
    id: "routes/promo",
    parentId: "root",
    path: "promo",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
