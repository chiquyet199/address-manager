import React from 'react'
import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv'

import './CsvDownloader.scss'

const CsvDownloader = props => {
  const { headers, data, text } = props
  return (
    <div className="csv-btn">
      <div className="mover" />
      <CSVLink data={[headers, ...data]}>{text}</CSVLink>
    </div>
  )
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
