'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">midgard-app documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/CrudModule.html" data-type="entity-link">CrudModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CrudModule-0a498142ec3daa9d07138b8f452f00e7"' : 'data-target="#xs-components-links-module-CrudModule-0a498142ec3daa9d07138b8f452f00e7"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CrudModule-0a498142ec3daa9d07138b8f452f00e7"' : 'id="xs-components-links-module-CrudModule-0a498142ec3daa9d07138b8f452f00e7"' }>
                                        <li class="link">
                                            <a href="components/DetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GraphQLModule.html" data-type="entity-link">GraphQLModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/MidgardHttpModule.html" data-type="entity-link">MidgardHttpModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/MidgardModule.html" data-type="entity-link">MidgardModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MidgardModule-07e1161fdc78c90f4910fe773f10e376"' : 'data-target="#xs-components-links-module-MidgardModule-07e1161fdc78c90f4910fe773f10e376"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MidgardModule-07e1161fdc78c90f4910fe773f10e376"' : 'id="xs-components-links-module-MidgardModule-07e1161fdc78c90f4910fe773f10e376"' }>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MidgardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MidgardComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NavBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavBarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/TopBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopBarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WorkflowLevel1Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkflowLevel1Component</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/WorkflowLevel2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">WorkflowLevel2Component</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MidgardRoutingModule.html" data-type="entity-link">MidgardRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/MidgardTranslationModule.html" data-type="entity-link">MidgardTranslationModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MidgardTranslationModule-fedd518ecbcd785307b9ef7ab5d291ce"' : 'data-target="#xs-components-links-module-MidgardTranslationModule-fedd518ecbcd785307b9ef7ab5d291ce"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MidgardTranslationModule-fedd518ecbcd785307b9ef7ab5d291ce"' : 'id="xs-components-links-module-MidgardTranslationModule-fedd518ecbcd785307b9ef7ab5d291ce"' }>
                                        <li class="link">
                                            <a href="components/TranslationLoader.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">TranslationLoader</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MigardStoreModule.html" data-type="entity-link">MigardStoreModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/ReduxCache.html" data-type="entity-link">ReduxCache</a>
                    </li>
                    <li class="link">
                        <a href="classes/ReduxNormalizedCache.html" data-type="entity-link">ReduxNormalizedCache</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/HttpService.html" data-type="entity-link">HttpService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/Store.html" data-type="entity-link">Store</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/Http.html" data-type="entity-link">Http</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/MidgardState.html" data-type="entity-link">MidgardState</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ReduxNormalizedCacheConfig.html" data-type="entity-link">ReduxNormalizedCacheConfig</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/WorkflowLevel1.html" data-type="entity-link">WorkflowLevel1</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/WorkflowLevel2.html" data-type="entity-link">WorkflowLevel2</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
