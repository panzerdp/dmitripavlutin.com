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

  function getNodeData(subscribersCount) {
    const nodeId = createNodeId(`mailerlite-stats-${subscribersCount}`)
    const nodeContent = { subscribersCount }
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

  let subscribersCount = 0

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
      subscribersCount = response.data.data[0].active_count
    }
  } catch (e) {
    console.warn('Failed to fetch mailerlite stats. Status: ' + e.response.status)
  }

  const dataForNode = getNodeData(subscribersCount)
  return createNode(dataForNode)
}
