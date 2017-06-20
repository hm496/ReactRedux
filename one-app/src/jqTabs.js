import $ from 'jquery';
import EventEmitter from 'events';

const Selector = (classPrefix) => ({
    PREFIX: classPrefix,
    NAV: `${classPrefix}-nav`,
    CONTENT: `${classPrefix}-content`,
    TAB: `${classPrefix}-tab`,
    PANEL: `${classPrefix}-panel`,
    ACTIVE: `${classPrefix}-active`,
    DISABLE: `${classPrefix}-disable`,
});

class Tabs {
    //static  ===  Tabs.static
    static defaultOptions = {
        classPrefix: 'tabs',
        activeIndex: 0,
    };

    constructor(options) {
        this.options = $.extend({}, Tabs.defaultOptions, options);
        this.element = $(this.options.element);
        this.fromIndex = this.options.activeIndex;

        this.events = new EventEmitter();
        this.selector = Selector(this.options.classPrefix);

        this._initElement();//获取元素
        this._initTabs();//初始化Tabs 添加class
        this._initPanels();//初始化Panels 添加class
        this._bindTabs();//Tabs绑定click事件

        if (this.options.activeIndex !== undefined) {
            this.switchTo(this.options.activeIndex);
        }
    }

    //根据options 获取dom元素
    _initElement() {
        this.element.addClass(this.selector.PREFIX);
        this.tabs = $(this.options.tabs);//
        this.panels = $(this.options.panels);
        this.nav = $(this.options.nav);
        this.content = $(this.options.content);

        this.length = this.tabs.length;
    }

    //根据Selector 给nav,tabs添加class
    _initTabs() {
        this.nav && this.nav.addClass(this.selector.NAV);
        this.tabs.addClass(this.selector.TAB).each((index, tab) => {
            $(tab).data('value', index);//设置索引data-value
        });
    }

    //根据Selector 给content,panels添加class
    _initPanels() {
        this.content.addClass(this.selector.CONTENT);
        this.panels.addClass(this.selector.PANEL);
    }

    //给tabs 绑定click事件
    _bindTabs() {
        this.tabs.click((e) => {
            const $el = $(e.target);
            if (!$el.hasClass(this.selector.DISABLE)) {
                this.switchTo($el.data('value'));
            }
        });
    }

    switchTo(toIndex) {
        this._switchTo(toIndex);
    }

    //切换Tabs && Panel
    _switchTo(toIndex) {
        const fromIndex = this.fromIndex;
        const panelInfo = this._getPanelInfo(toIndex);

        this._switchTabs(toIndex);
        this._switchPanel(panelInfo);
        this.events.emit('change', {toIndex, fromIndex});

        this.fromIndex = toIndex;
    }

    //切换Tabs
    _switchTabs(toIndex) {
        const tabs = this.tabs;
        const fromIndex = this.fromIndex;

        if (tabs.length < 1) {
            return;
        }
        tabs
            .eq(fromIndex)
            .removeClass(this.selector.ACTIVE)
            .attr('aria-selected', false);
        tabs
            .eq(toIndex)
            .addClass(this.selector.ACTIVE)
            .attr('aria-selected', true);
    }

    //切换Panel
    _switchPanel(panelInfo) {
        panelInfo.fromPanels
            .attr('aria-hidden', true)
            .hide();
        panelInfo.toPanels
            .attr('aria-hidden', true)
            .show();
    }

    _getPanelInfo(toIndex) {
        const panels = this.panels;//获取所有panels元素
        const fromIndex = this.fromIndex;//记录上一个panels索引

        let fromPanels, toPanels;
        if (fromIndex > -1) {
            fromPanels = this.panels.slice(fromIndex, (fromIndex + 1));//fromIndex截取1个
        }
        toPanels = this.panels.slice(toIndex, (toIndex + 1));//toIndex截取1个

        return {
            toIndex: toIndex,
            fromIndex: fromIndex,
            toPanels: $(toPanels),
            fromPanels: $(fromPanels),
        };
    }

    //销毁,解绑所有事件
    destroy() {
        this.events.removeAllListeners();
    }
}

export default Tabs;
