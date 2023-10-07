import axios from 'axios';

const elasticsearchEndpoint = 'http://localhost:9200/text_stream/_doc';

export const elasticData = async (data) => {
  try {
    const response = await axios.post(elasticsearchEndpoint, data);
    console.log('Data sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending data to Elasticsearch:', error);
  }
};
