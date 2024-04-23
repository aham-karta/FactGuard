from tavily import TavilyClient
tavily = TavilyClient(api_key="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")
response = tavily.search(query="who is barack", search_depth="advanced", include_answer=True)
query = response["query"]
answer = response["answer"]
print(query)
print(answer)