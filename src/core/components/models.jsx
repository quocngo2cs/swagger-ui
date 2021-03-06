import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Models extends Component {
  static propTypes = {
    getComponent: PropTypes.func,
    specSelectors: PropTypes.object,
    layoutSelectors: PropTypes.object,
    layoutActions: PropTypes.object,
    getConfigs: PropTypes.func.isRequired
  }

  render(){
    let { specSelectors, getComponent, layoutSelectors, layoutActions, getConfigs } = this.props
    let definitions = specSelectors.definitions()
    let { docExpansion, defaultModelExpandDepth } = getConfigs()
    let showModels = layoutSelectors.isShown("models", docExpansion === "full" || docExpansion === "list" )
    const specPathBase = specSelectors.isOAS3() ? ["components", "schemas"] : ["definitions"]

    const ModelWrapper = getComponent("ModelWrapper")
    const Collapse = getComponent("Collapse")

    if (!definitions.size) return null

    return <section className={ showModels ? "models is-open" : "models"}>
      <h4 onClick={() => layoutActions.show("models", !showModels)}>
        <span>Models</span>
        <svg width="20" height="20">
          <use xlinkHref={showModels ? "#large-arrow-down" : "#large-arrow"} />
        </svg>
      </h4>
      <Collapse isOpened={showModels}>
        {
          definitions.entrySeq().map( ( [ name, model ])=>{

            return <div id={ `model-${name}` } className="model-container" key={ `models-section-${name}` }>
              <ModelWrapper name={ name }
                     expandDepth={ defaultModelExpandDepth }
                     schema={ model }
                     specPath={[...specPathBase, name]}
                     getComponent={ getComponent }
                     specSelectors={ specSelectors }
                     getConfigs = {getConfigs}
                     layoutSelectors = {layoutSelectors}
                     layoutActions = {layoutActions}/>
              </div>
          }).toArray()
        }
      </Collapse>
    </section>
  }
}
