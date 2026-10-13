(() => {
  const root = new URL('.', document.currentScript.src);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  class GloryWhatsApp extends HTMLElement {
    connectedCallback() {
      if (this.shadowRoot) return;
      const shadow=this.attachShadow({mode:'open'});
      const url=this.getAttribute('href') || window.GLORY_WHATSAPP_URL || 'https://wa.me/85256273064/';
      shadow.innerHTML=`<style>
        :host{--glory-text:#190f07;--glory-title:rgba(0,0,0,.85);--glory-body:rgba(0,0,0,.65);--glory-accent:#24d4c9;--whatsapp-link:#025B52;display:inline-flex;position:relative;vertical-align:middle;width:26px;height:26px;z-index:5;font-family:Arial,sans-serif}
        *{box-sizing:border-box}button{padding:0;border:0;background:none;cursor:pointer;color:inherit;font:inherit}
        .trigger{display:block;width:100%;height:100%;position:relative;border-radius:5px;-webkit-tap-highlight-color:transparent}
        .trigger:focus-visible{outline:2px solid var(--glory-accent);outline-offset:5px}.art,.fallback{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.fallback{object-fit:contain}.art{opacity:0}.ready .art{opacity:1}.ready .fallback{opacity:0}
        .panel{position:absolute;left:-16px;bottom:calc(100% + 18px);width:218px;padding:17px 16px 15px;border:1px solid #e0eae4;border-radius:14px;background:#fff;box-shadow:0 12px 42px #123b2524;opacity:0;visibility:hidden;transform:translateY(8px) scale(.98);transform-origin:30px bottom;transition:opacity .24s,transform .32s cubic-bezier(.2,.7,.2,1),visibility .24s;cursor:default;text-align:center;color:var(--glory-text)}
        .panel::before{content:'';position:absolute;left:0;right:0;bottom:-22px;height:22px}.panel::after{content:'';position:absolute;left:24px;bottom:-6px;width:11px;height:11px;background:#fff;border-right:1px solid #e0eae4;border-bottom:1px solid #e0eae4;transform:rotate(45deg)}
        :host([data-open]) .panel{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
        .heading{color:var(--glory-title);display:block;font-size:14px;font-weight:600;line-height:20px;margin:0 0 3px}.caption{font-size:11px;color:var(--glory-body);margin:0;line-height:18px}.qr{display:block;width:184px;height:184px;margin:5px auto}.link{color:var(--whatsapp-link);font-size:12px;text-decoration:none;display:block;padding:5px 0;line-height:20px}.link:hover,.link:focus-visible{color:var(--whatsapp-link);text-decoration:underline}
        :host([placement="bottom"]) .panel{top:calc(100% + 18px);bottom:auto;transform:translateY(-8px) scale(.98);transform-origin:30px top}
        :host([placement="bottom"]) .panel::before{top:-22px;bottom:auto}
        :host([placement="bottom"]) .panel::after{top:-6px;bottom:auto;transform:rotate(225deg)}
        @media(max-width:576px){.panel{top:calc(100% + 18px);bottom:auto;transform:translateY(-8px) scale(.98);transform-origin:30px top}.panel::before{top:-22px;bottom:auto}.panel::after{top:-6px;bottom:auto;transform:rotate(225deg)}}
        @media(prefers-reduced-motion:reduce){.panel{transition:none}}
      </style><button class="trigger" type="button" aria-label="WhatsApp，打开扫码联系浮层" aria-expanded="false" aria-controls="qr-panel"><img class="fallback" src="${new URL('assets/whatsapp-icon.svg?v=v2-one-second',root)}" alt=""><span class="art" aria-hidden="true"></span></button>
      <section class="panel" id="qr-panel" aria-label="WhatsApp 扫码联系" inert><strong class="heading">WhatsApp</strong><p class="caption">扫码与 GLORY 联系</p><img class="qr" src="${this.getAttribute('qr-src') || new URL('assets/whatsapp-qr.svg?v=user-qr',root)}" alt="WhatsApp 联系二维码"><a class="link" href="${url}" target="_blank" rel="noopener noreferrer">打开 WhatsApp ↗</a><p class="caption">+852 5627 3064</p></section>`;
      this.trigger=shadow.querySelector('.trigger'); this.panel=shadow.querySelector('.panel');
      const open=()=>this.setOpen(true),close=()=>this.setOpen(false);
      this.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){this.hovering=true;open();}});
      this.addEventListener('pointerleave',()=>{this.hovering=false;if(!this.shadowRoot.activeElement)close();});
      this.addEventListener('focusin',open);
      this.addEventListener('focusout',()=>queueMicrotask(()=>{if(!shadow.activeElement&&!this.hovering)close();}));
      this.trigger.addEventListener('click',()=>{this.setOpen(!this.pinned || !this.hasAttribute('data-open'));this.pinned=this.hasAttribute('data-open');});
      this.addEventListener('keydown',e=>{if(e.key==='Escape'){this.trigger.focus();close();e.stopPropagation();}});
      this.outside=e=>{if(!e.composedPath().includes(this)){this.hovering=false;close();}};
      document.addEventListener('pointerdown',this.outside);
      this.onMotion=()=>this.syncMotion();reduced.addEventListener('change',this.onMotion);
      this.onVisibility=()=>this.syncMotion();document.addEventListener('visibilitychange',this.onVisibility);
      this.intersection=new IntersectionObserver(entries=>{this.inView=entries[0].isIntersecting;this.syncMotion();});this.intersection.observe(this);
      this.load();
    }
    async load(){
      const version=['v1','v2','v3','v4'].includes(this.getAttribute('variant'))?this.getAttribute('variant'):'v2';
      try {
        const data=window.GLORY_ANIMATIONS?.[version] || await (await fetch(new URL(`assets/whatsapp-${version}.json`,root))).json();
        if(!this.isConnected||!window.lottie)return;
        this.animation=lottie.loadAnimation({container:this.shadowRoot.querySelector('.art'),renderer:'svg',loop:true,autoplay:false,animationData:structuredClone(data)});
        this.animation.addEventListener('DOMLoaded',()=>{this.trigger.classList.add('ready');this.syncMotion();});
      } catch(error){console.warn('WhatsApp animation fallback:',error);}
    }
    setOpen(open){this.toggleAttribute('data-open',open);this.trigger.setAttribute('aria-expanded',String(open));this.panel.inert=!open;if(!open)this.pinned=false;this.syncMotion();}
    syncMotion(){if(!this.animation)return;if(reduced.matches){this.animation.goToAndStop(0,true);return;}if(this.hasAttribute('data-open')||this.inView===false||document.hidden)this.animation.pause();else this.animation.play();}
    disconnectedCallback(){this.animation?.destroy();this.intersection?.disconnect();document.removeEventListener('pointerdown',this.outside);document.removeEventListener('visibilitychange',this.onVisibility);reduced.removeEventListener('change',this.onMotion);}
  }
  customElements.define('glory-whatsapp',GloryWhatsApp);
})();
