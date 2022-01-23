import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "@/App";
import { getters, state } from "@/store";
import Vuex from "vuex";
describe("App.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountComponent();
  });
  it("should h1 exists", () => {
    const h1 = wrapper.find("h1");
    expect(h1.exists()).toBeTruthy();
  });
  it("should h1 text equals to Daily Corona Cases in Turkey", () => {
    const h1 = wrapper.find("h1");
    expect(h1.text()).toEqual("Daily Corona Cases in Turkey");
  });
  it("notificationArea class check based on getCount value", async() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    let wrapper = shallowMount(App, {
      localVue,
      mocks:{ 
          $store:{
              state:{ 
                  ...state
              },
              getters:{ 
                  getCount:4,
              }
          }
      }
    });
    expect(wrapper.find("#app div").classes()[1]).toContain('safe');
    wrapper.vm.$store.getters.getCount=8
    await localVue.nextTick();
    expect(wrapper.find("#app div").classes()[1]).toContain('normal');
    wrapper.vm.$store.getters.getCount=15
    await localVue.nextTick();
    expect(wrapper.find("#app div").classes()[1]).toContain('danger');
  });
  it("notificationArea class check based on getCount value", async() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    let wrapper = shallowMount(App, {
      localVue,
      mocks:{ 
          $store:{
              state:{ 
                  ...state
              },
              getters:{ 
                  getCount:4,
              }
          }
      }
    });
    expect(wrapper.find(".notificationArea").classes()[1]).toContain('safe');
    wrapper.vm.$store.getters.getCount=8
    await localVue.nextTick();
    expect(wrapper.find(".notificationArea").classes()[1]).toContain('normal');
    wrapper.vm.$store.getters.getCount=15
    await localVue.nextTick();
    expect(wrapper.find(".notificationArea").classes()[1]).toContain('danger');
  });
  it("notificationArea text message check", async() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    let wrapper = shallowMount(App, {
      localVue,
      mocks:{ 
          $store:{
              state:{ 
                  count:4
              },
              getters,
          },
      }
    });
    expect(wrapper.find(".notificationArea").text()).toContain(`So safe. Case count is ${4}k`);
    wrapper.vm.$store.state.count=8
    await localVue.nextTick();
    expect(wrapper.find(".notificationArea").text()).toContain(`Life is normal. Case count is ${8}k`);
    wrapper.vm.$store.state.count=15
    await localVue.nextTick();
    expect(wrapper.find(".notificationArea").text()).toContain(`Danger!!! Case count is ${15}k`);
  });
});

function mountComponent() {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return shallowMount(App, {
    localVue,
    store: new Vuex.Store({
      state: { ...state },
      getters: { ...getters },
    }),
  });
}
