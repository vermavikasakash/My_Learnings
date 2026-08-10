## terms realted with Agent sdk
# Agent
Agents are the main building‑block of the OpenAI Agents SDK. An Agent is a Large Language Model (LLM) that has been configured with: Instruction,model tool,
Agent always have name and instrcution

# Agent with tools
Tools let an Agent take actions – fetch data, call external APIs, execute code, or even use a computer.

# Composition patterns
Two SDK entry points show up most often when an agent participates in a larger workflow:

# ----  #
1.Manager (agents as tools) – a central agent owns the conversation and invokes specialized agents that are exposed as tools.
2.Handoffs – the initial agent delegates the entire conversation to a specialist once it has identified the user’s request.
# ----  #

# RAG
RAG is used to retrieve external knowledge for LLM context

# MCP - Model context protocol
MCP enables the model to interact with external tools and perform actions like API calls or database operations.


