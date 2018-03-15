import React from 'react'
import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv'

const CsvDownloader = props => {
  const { headers, data, text } = props
  return <CSVLink data={[headers, ...data]}>{text}</CSVLink>
}

CsvDownloader.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array.isRequired,
  text: PropTypes.string,
}

CsvDownloader.defaultProps = {
  text: 'Csv Downloader Link',
  headers: [],
}

export default CsvDownloader
