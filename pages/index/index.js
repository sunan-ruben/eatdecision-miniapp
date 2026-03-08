const app = getApp()

Page({
  data: {
    budget: '',
    peopleCount: 2,
    peopleIndex: 1,
    peopleRange: Array.from({ length: 20 }, (_, i) => i + 1),
    restaurants: [],
    errorMsg: '',
    loading: false,
    showResult: false
  },

  /** 预算输入绑定 */
  onBudgetInput(e) {
    this.setData({
      budget: e.detail.value
    })
  },

  /** 人数选择器变化 */
  onPeopleChange(e) {
    const index = parseInt(e.detail.value)
    this.setData({
      peopleIndex: index,
      peopleCount: index + 1
    })
  },

  /** 输入校验 */
  validateInput() {
    const { budget, peopleCount } = this.data
    const budgetNum = parseInt(budget)

    if (!budget || isNaN(budgetNum) || budgetNum < 10) {
      wx.showToast({
        title: '预算过低，请输入至少 10 元',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (peopleCount < 1) {
      wx.showToast({
        title: '人数必须至少为 1 人',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    if (peopleCount > 20) {
      wx.showToast({
        title: '人数不能超过 20 人',
        icon: 'none',
        duration: 2000
      })
      return false
    }

    return true
  },

  /** 获取推荐 */
  getRecommendation() {
    if (!this.validateInput()) return

    const { budget, peopleCount } = this.data

    this.setData({
      loading: true,
      errorMsg: '',
      restaurants: [],
      showResult: false
    })

    wx.request({
      url: app.globalData.apiBaseUrl + '/api/recommend',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        budget: parseInt(budget),
        peopleCount: parseInt(peopleCount)
      },
      success: (res) => {
        const { code, message, data } = res.data

        if (code === 200 && data && data.length > 0) {
          this.setData({
            restaurants: data,
            showResult: true,
            errorMsg: ''
          })
        } else if (code === 200 && (!data || data.length === 0)) {
          this.setData({
            restaurants: [],
            showResult: true,
            errorMsg: ''
          })
        } else {
          this.setData({
            errorMsg: message || '请求失败，请稍后重试',
            showResult: false
          })
        }
      },
      fail: () => {
        this.setData({
          errorMsg: '网络连接失败，请稍后重试',
          showResult: false
        })
      },
      complete: () => {
        this.setData({
          loading: false
        })
      }
    })
  }
})
