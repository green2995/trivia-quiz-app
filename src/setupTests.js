import "@testing-library/jest-dom"

jest.setTimeout(100000);
window.HTMLElement.prototype.scrollTo = jest.fn()