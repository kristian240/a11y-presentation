/*
  Inert polyfill
  https://github.com/WICG/inert
*/
!(function () {
  if ('undefined' == typeof window) return;
  const e = Array.prototype.slice,
    t = Element.prototype.matches || Element.prototype.msMatchesSelector,
    n = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'details',
      'summary',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
    ].join(',');
  class s {
    constructor(e, t) {
      (this._inertManager = t),
        (this._rootElement = e),
        (this._managedNodes = new Set()),
        this._rootElement.hasAttribute('aria-hidden')
          ? (this._savedAriaHidden = this._rootElement.getAttribute('aria-hidden'))
          : (this._savedAriaHidden = null),
        this._rootElement.setAttribute('aria-hidden', 'true'),
        this._makeSubtreeUnfocusable(this._rootElement),
        (this._observer = new MutationObserver(this._onMutation.bind(this))),
        this._observer.observe(this._rootElement, { attributes: !0, childList: !0, subtree: !0 });
    }
    destructor() {
      this._observer.disconnect(),
        this._rootElement &&
          (null !== this._savedAriaHidden
            ? this._rootElement.setAttribute('aria-hidden', this._savedAriaHidden)
            : this._rootElement.removeAttribute('aria-hidden')),
        this._managedNodes.forEach(function (e) {
          this._unmanageNode(e.node);
        }, this),
        (this._observer = null),
        (this._rootElement = null),
        (this._managedNodes = null),
        (this._inertManager = null);
    }
    get managedNodes() {
      return new Set(this._managedNodes);
    }
    get hasSavedAriaHidden() {
      return null !== this._savedAriaHidden;
    }
    set savedAriaHidden(e) {
      this._savedAriaHidden = e;
    }
    get savedAriaHidden() {
      return this._savedAriaHidden;
    }
    _makeSubtreeUnfocusable(e) {
      i(e, (e) => this._visitNode(e));
      let t = document.activeElement;
      if (!document.body.contains(e)) {
        let n = e,
          s = void 0;
        for (; n; ) {
          if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            s = n;
            break;
          }
          n = n.parentNode;
        }
        s && (t = s.activeElement);
      }
      e.contains(t) && (t.blur(), t === document.activeElement && document.body.focus());
    }
    _visitNode(e) {
      if (e.nodeType !== Node.ELEMENT_NODE) return;
      const s = e;
      s !== this._rootElement && s.hasAttribute('inert') && this._adoptInertRoot(s),
        (t.call(s, n) || s.hasAttribute('tabindex')) && this._manageNode(s);
    }
    _manageNode(e) {
      const t = this._inertManager.register(e, this);
      this._managedNodes.add(t);
    }
    _unmanageNode(e) {
      const t = this._inertManager.deregister(e, this);
      t && this._managedNodes.delete(t);
    }
    _unmanageSubtree(e) {
      i(e, (e) => this._unmanageNode(e));
    }
    _adoptInertRoot(e) {
      let t = this._inertManager.getInertRoot(e);
      t || (this._inertManager.setInert(e, !0), (t = this._inertManager.getInertRoot(e))),
        t.managedNodes.forEach(function (e) {
          this._manageNode(e.node);
        }, this);
    }
    _onMutation(t, n) {
      t.forEach(function (t) {
        const n = t.target;
        if ('childList' === t.type)
          e.call(t.addedNodes).forEach(function (e) {
            this._makeSubtreeUnfocusable(e);
          }, this),
            e.call(t.removedNodes).forEach(function (e) {
              this._unmanageSubtree(e);
            }, this);
        else if ('attributes' === t.type)
          if ('tabindex' === t.attributeName) this._manageNode(n);
          else if (
            n !== this._rootElement &&
            'inert' === t.attributeName &&
            n.hasAttribute('inert')
          ) {
            this._adoptInertRoot(n);
            const e = this._inertManager.getInertRoot(n);
            this._managedNodes.forEach(function (t) {
              n.contains(t.node) && e._manageNode(t.node);
            });
          }
      }, this);
    }
  }
  class o {
    constructor(e, t) {
      (this._node = e),
        (this._overrodeFocusMethod = !1),
        (this._inertRoots = new Set([t])),
        (this._savedTabIndex = null),
        (this._destroyed = !1),
        this.ensureUntabbable();
    }
    destructor() {
      if ((this._throwIfDestroyed(), this._node && this._node.nodeType === Node.ELEMENT_NODE)) {
        const e = this._node;
        null !== this._savedTabIndex
          ? e.setAttribute('tabindex', this._savedTabIndex)
          : e.removeAttribute('tabindex'),
          this._overrodeFocusMethod && delete e.focus;
      }
      (this._node = null), (this._inertRoots = null), (this._destroyed = !0);
    }
    get destroyed() {
      return this._destroyed;
    }
    _throwIfDestroyed() {
      if (this.destroyed) throw new Error('Trying to access destroyed InertNode');
    }
    get hasSavedTabIndex() {
      return null !== this._savedTabIndex;
    }
    get node() {
      return this._throwIfDestroyed(), this._node;
    }
    set savedTabIndex(e) {
      this._throwIfDestroyed(), (this._savedTabIndex = e);
    }
    get savedTabIndex() {
      return this._throwIfDestroyed(), this._savedTabIndex;
    }
    ensureUntabbable() {
      if (this.node.nodeType !== Node.ELEMENT_NODE) return;
      const e = this.node;
      if (t.call(e, n)) {
        if (-1 === e.tabIndex && this.hasSavedTabIndex) return;
        e.hasAttribute('tabindex') && (this._savedTabIndex = e.tabIndex),
          e.setAttribute('tabindex', '-1'),
          e.nodeType === Node.ELEMENT_NODE &&
            ((e.focus = function () {}), (this._overrodeFocusMethod = !0));
      } else
        e.hasAttribute('tabindex') &&
          ((this._savedTabIndex = e.tabIndex), e.removeAttribute('tabindex'));
    }
    addInertRoot(e) {
      this._throwIfDestroyed(), this._inertRoots.add(e);
    }
    removeInertRoot(e) {
      this._throwIfDestroyed(),
        this._inertRoots.delete(e),
        0 === this._inertRoots.size && this.destructor();
    }
  }
  function i(e, t, n) {
    if (e.nodeType == Node.ELEMENT_NODE) {
      const s = e;
      t && t(s);
      const o = s.shadowRoot;
      if (o) return void i(o, t, o);
      if ('content' == s.localName) {
        const e = s,
          o = e.getDistributedNodes ? e.getDistributedNodes() : [];
        for (let e = 0; e < o.length; e++) i(o[e], t, n);
        return;
      }
      if ('slot' == s.localName) {
        const e = s,
          o = e.assignedNodes ? e.assignedNodes({ flatten: !0 }) : [];
        for (let e = 0; e < o.length; e++) i(o[e], t, n);
        return;
      }
    }
    let s = e.firstChild;
    for (; null != s; ) i(s, t, n), (s = s.nextSibling);
  }
  function r(e) {
    if (e.querySelector('style#inert-style, link#inert-style')) return;
    const t = document.createElement('style');
    t.setAttribute('id', 'inert-style'),
      (t.textContent =
        '\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n'),
      e.appendChild(t);
  }
  const d = new (class {
    constructor(e) {
      if (!e) throw new Error('Missing required argument; InertManager needs to wrap a document.');
      (this._document = e),
        (this._managedNodes = new Map()),
        (this._inertRoots = new Map()),
        (this._observer = new MutationObserver(this._watchForInert.bind(this))),
        r(e.head || e.body || e.documentElement),
        'loading' === e.readyState
          ? e.addEventListener('DOMContentLoaded', this._onDocumentLoaded.bind(this))
          : this._onDocumentLoaded();
    }
    setInert(e, t) {
      if (t) {
        if (this._inertRoots.has(e)) return;
        const t = new s(e, this);
        if (
          (e.setAttribute('inert', ''),
          this._inertRoots.set(e, t),
          !this._document.body.contains(e))
        ) {
          let t = e.parentNode;
          for (; t; ) 11 === t.nodeType && r(t), (t = t.parentNode);
        }
      } else {
        if (!this._inertRoots.has(e)) return;
        this._inertRoots.get(e).destructor(),
          this._inertRoots.delete(e),
          e.removeAttribute('inert');
      }
    }
    getInertRoot(e) {
      return this._inertRoots.get(e);
    }
    register(e, t) {
      let n = this._managedNodes.get(e);
      return void 0 !== n ? n.addInertRoot(t) : (n = new o(e, t)), this._managedNodes.set(e, n), n;
    }
    deregister(e, t) {
      const n = this._managedNodes.get(e);
      return n ? (n.removeInertRoot(t), n.destroyed && this._managedNodes.delete(e), n) : null;
    }
    _onDocumentLoaded() {
      e.call(this._document.querySelectorAll('[inert]')).forEach(function (e) {
        this.setInert(e, !0);
      }, this),
        this._observer.observe(this._document.body || this._document.documentElement, {
          attributes: !0,
          subtree: !0,
          childList: !0,
        });
    }
    _watchForInert(n, s) {
      const o = this;
      n.forEach(function (n) {
        switch (n.type) {
          case 'childList':
            e.call(n.addedNodes).forEach(function (n) {
              if (n.nodeType !== Node.ELEMENT_NODE) return;
              const s = e.call(n.querySelectorAll('[inert]'));
              t.call(n, '[inert]') && s.unshift(n),
                s.forEach(function (e) {
                  this.setInert(e, !0);
                }, o);
            }, o);
            break;
          case 'attributes':
            if ('inert' !== n.attributeName) return;
            const s = n.target,
              i = s.hasAttribute('inert');
            o.setInert(s, i);
        }
      }, this);
    }
  })(document);
  Element.prototype.hasOwnProperty('inert') ||
    Object.defineProperty(Element.prototype, 'inert', {
      enumerable: !0,
      get: function () {
        return this.hasAttribute('inert');
      },
      set: function (e) {
        d.setInert(this, e);
      },
    });
})();
