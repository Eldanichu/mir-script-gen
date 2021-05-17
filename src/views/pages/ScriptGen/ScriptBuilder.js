export class ScriptBuilder {
  constructor(options) {

    if (!options) {
      options = {}
    }

    let _DEFAULTS = {
      headers: options.headers || [],
      body: options.body || {}
    }

    this.options = _DEFAULTS;
    this.string_template = []

    this.bodyEmptyMatcher = /\s+|\t|\n/i

    this.setup();
  }

  setup() {
    this.header();
    this.body()
    this.action();
  }

  hasHeaders() {
    return this.options.headers.length
  }

  getHeaders() {
    return ''
  }

  header() {
    this.string_template.push('[@main]')
    if (!this.hasHeaders()) {
      return
    }
    this.string_template.unshift(`(${this.getHeaders()})`)
  }

  isEmptyBody() {
    let _emptyStr = this.options.body.replace(this.bodyEmptyMatcher, '')
    return !_emptyStr
  }

  parseBody() {
    let _body_str = []
    this.options.body.forEach((item) => {
      if (item.line) {
        _body_str.push(`\\\n`)
        return
      }
      _body_str.push(`<${item.name}/@${item.name}>`)
    })
    return _body_str.join('  ')
  }

  body() {
    this.string_template.push(this.parseBody())
  }

  parseActions() {
    let _action_str = []
    this.options.body.forEach((item) => {
      if (item.line) {
        return
      }
      _action_str.push([
        `[@${item.name}] `,
        '#IF',
        this.getItemCondition(item.type, item.fee, true),
        '#ACT',
        this.getItemCondition(item.type, item.fee, false),
        `MAPMOVE ${item.mapID} ${item.coords.x} ${item.coords.y}`,
        '\n'
      ].join('\n'))
    })

    return _action_str.join('').replace(/\s|\t/i, '')
  }

  action() {
    this.string_template.push(';---------------------------------------')
    this.string_template.push(this.parseActions())
  }

  getItemCondition(type, value, condi) {
    let _action = condi ? 'CHECK' : 'TAKE ';
    let _opt_symbol = condi ? '>' : ''
    let _value = condi ? `${Number(value) - 1}` : Number(value)
    if (type === 'gold') {
      return `${_action}GOLD ${_opt_symbol} ${_value}`
    } else if (type === 'gamegold') {
      return `${_action}GAMEGOLD ${_opt_symbol} ${_value}`
    }
  }

  getString() {
    return this.string_template.join('\n')
  }
}
