const processRows = (rows: HTMLTableRowElement[]) => {
    for (const row of rows) {
        const issueNumberElms: NodeListOf<HTMLTableCellElement> = row.querySelectorAll("td.date")

        if (issueNumberElms.length === 0) {
            continue
        }

        const issueNumberElm = issueNumberElms.item(0)
        const { issueNumber } = issueNumberElm.dataset

        if (issueNumber) {
            const { innerHTML } = issueNumberElm

            issueNumberElm.innerHTML = `<a href="https://github.com/PeyaPeyaPeyang/HomePage/issues/${issueNumber}" target="_blank">${innerHTML}</a>`
        }
    }
}

const onLoad = () => {
    const mainTable = document.querySelector("#lucky_table")

    if (mainTable) {
        const rows = mainTable.querySelectorAll("tr")

        processRows([...rows])
    }
}

window.addEventListener("load", onLoad)
