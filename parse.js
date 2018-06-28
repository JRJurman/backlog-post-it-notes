var issueDOM = document.querySelectorAll('.js-issue')
var issueDOMArray = new Array(issueDOM.length).fill('').map((e, i) => issueDOM[i])

var getElementContent = (element, selector) => element.querySelector(selector) ? element.querySelector(selector).textContent : ''

var issues = issueDOMArray.map(issue => ({
  key: getElementContent(issue, '.js-key-link'),
  summary: getElementContent(issue, '.ghx-summary'),
  epic: getElementContent(issue, '.ghx-label'),
  points: getElementContent(issue, '.ghx-statistic-badge')
}))

var issuePages = issues.reduce((DOM, issue, index) => {
  const epic = issue.epic ? `
    <g class="epic">
      <rect width=200 height="15"
            style="fill:white;stroke-width:0.5;stroke:rgb(0,0,0)" />
      <text y="13" width="200" x="50%" text-anchor="middle"
            style="font-size: ${issue.epic.length > 20 ? '0.8em' : '1em'};">
        ${issue.epic}
      </text>
    </g>
  ` : ''

  const key = `
    <g class="key">
      <text y="60" width="200" x="50%"
            text-anchor="middle"
            style="font-size: 3em;">
        ${issue.key}
      </text>
    </g>
  `

  const summary = `
    <foreignObject width="190" height="140" x="5" y="52">
      <p xmlns="http://www.w3.org/1999/xhtml">
        ${issue.summary}
      </p>
    </foreignObject>
  `

  const points = `
    <g class="points">
      <text y="180" x="140" style="font-size: 2em;">
        ${issue.points}
      </text>
    </g>
  `

  return DOM.concat(`
      <svg id=${issue.key} class="issue" viewbox="0 0 200 200">
        ${epic}
        ${key}
        ${summary}
        ${points}
      </svg>
    `)
  }
, `
  <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet">

  <style>
    body {
      font-family: 'Gloria Hallelujah';
    }
    @media print {
      @page {
        size: 80mm 80mm;
      }
    }
    p {
      line-height: 1.2;
    }
    .issue {
      border: solid;
    }
    .epic {
      text-align: center;
    }
    .points {
      text-align: right;
    }
  </style>
`)
issuePages
