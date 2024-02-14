const removeUrlPrefix = (url: string): string => {
    let cleanedUrl = url.replace(/^https?:\/\//, '');
    cleanedUrl = cleanedUrl.replace(/www\./, '');
    cleanedUrl = cleanedUrl.replace(/(\?.*|#.*)/, '');
    cleanedUrl = cleanedUrl.replace(/\/$/, '');
    return cleanedUrl;
  };
  
  

export { removeUrlPrefix }
