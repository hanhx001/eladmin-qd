
const baseUrl = process.env.BASE_API
import request from '@/utils/request'

export function query(data) {
  if (!data.topicName) {
    return request({
      url: baseUrl + '/api/voteTopic?page=' + data.page + '&size=' + data.size,
      method: 'get'
    })
  } else {
    var url = baseUrl + '/api/voteTopic?page='
    if (data.enabled === 'boolean') {
      var parameters = data.page + '&size=' + data.size + '&topicName=' + data.topicName + '&enabled=' + data.enabled
    } else {
      parameters = data.page + '&size=' + data.size + '&topicName=' + data.topicName
    }
    return request({
      url: url + parameters,
      method: 'get'
    })
  }
}

export function add(data) {
  return request({
    url: baseUrl + '/api/voteTopic',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: baseUrl + '/api/voteTopic/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  debugger
  return request({
    url: baseUrl + '/api/voteTopic',
    method: 'put',
    data
  })
}

export function editVote(id) {
  return request({
    url: baseUrl + '/api/voteTopicDetail?id=' + id,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: baseUrl + '/api/localStorage',
    method: 'post',
    data
  })
}

export function updatedEdit(data) {
  return request({
    url: baseUrl + '/api/localStorage',
    method: 'put',
    data
  })
}

export function updatedEel(data) {
  return request({
    url: baseUrl + '/api/localStorage',
    method: 'delete',
    data
  })
}
