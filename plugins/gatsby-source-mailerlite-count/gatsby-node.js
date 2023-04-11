const MailerLite = require('@mailerlite/mailerlite-nodejs').default

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  const { key, groupName } = configOptions
  const mailerlite = new MailerLite({
    api_key: key
  })

  delete configOptions.plugins

  function getNodeData(count) {
    const nodeId = createNodeId(`mailerlite-stats-${count}`)
    const nodeContent = { count }
    const nodeData = {
      ...nodeContent,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'MailerliteStats',
        content: JSON.stringify(nodeContent),
        contentDigest: createContentDigest(nodeContent),
      },
    }
    return nodeData
  }

  let count = 0

  try {
    const params = {
      limit: 1,
      page: 1,
      filter: {
        name: groupName,
      }
    }

    const response = await mailerlite.groups.get(params)
    if (response.data?.data?.length > 0) {
      count = response.data.data[0].active_count
    }
  } catch (e) {
    console.warn('Failed to fetch mailerlite stats. Status: ' + e.response.status)
  }

  const dataForNode = getNodeData(count)
  return createNode(dataForNode)
}
